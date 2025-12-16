<template>
  <div class="quik-playground">
    <div class="playground-container">
      <div class="editor-panel">
        <div class="panel-header">
          <span class="panel-title">📝 {{ isZh ? 'XML 编辑器' : 'XML Editor' }}</span>
          <button class="run-btn" @click="runCode" :disabled="!isReady">
            {{ isReady ? (isZh ? '▶ 运行' : '▶ Run') : (isZh ? '⏳ 加载中...' : '⏳ Loading...') }}
          </button>
        </div>
        <div ref="editorContainer" class="code-editor"></div>
      </div>
      <div class="preview-panel">
        <div class="panel-header">
          <span class="panel-title">👁 {{ isZh ? '预览' : 'Preview' }}</span>
          <span class="status" :class="{ ready: isReady, loading: !isReady }">
            {{ isReady ? (isZh ? '✓ 就绪' : '✓ Ready') : (isZh ? '加载 WASM...' : 'Loading WASM...') }}
          </span>
        </div>
        <div class="preview-container">
          <iframe 
            ref="previewFrame"
            :src="previewUrl"
            class="preview-iframe"
            @load="onIframeLoad"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, shallowRef } from 'vue'
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { xml } from '@codemirror/lang-xml'
import { oneDark } from '@codemirror/theme-one-dark'
import { defaultKeymap } from '@codemirror/commands'

const initialXmlZh = `<Panel>
    <Label text="欢迎使用 Quik!" alignment="center"/>
    <LineEdit title="姓名" var="name" default=""/>
    <Slider title="数值" var="value" min="0" max="100"/>
    <ProgressBar var="value" min="0" max="100"/>
    <CheckBox title="启用按钮" var="btnActive" default="0"/>
    <PushButton text="点击我" enabled="$btnActive==1"/>
    <CheckBox title="显示提示" var="showTip" default="0"/>
    <Label text="✓ 提示已开启" visible="$showTip==1"/>
    <Label text="✓ 滑块=50 且 提示开启" visible="$value==50 and $showTip==1"/>
    <addStretch/>
</Panel>`

const initialXmlEn = `<Panel>
    <Label text="Welcome to Quik!" alignment="center"/>
    <LineEdit title="Name" var="name" default=""/>
    <Slider title="Value" var="value" min="0" max="100"/>
    <ProgressBar var="value" min="0" max="100"/>
    <CheckBox title="Enable Button" var="btnActive" default="0"/>
    <PushButton text="Click Me" enabled="$btnActive==1"/>
    <CheckBox title="Show Tip" var="showTip" default="0"/>
    <Label text="✓ Tip enabled" visible="$showTip==1"/>
    <Label text="✓ Slider=50 and Tip enabled" visible="$value==50 and $showTip==1"/>
    <addStretch/>
</Panel>`

// 检测当前语言
const isZh = ref(true)
const initialXml = computed(() => isZh.value ? initialXmlZh : initialXmlEn)

const editorContainer = ref(null)
const editorView = shallowRef(null)
const previewFrame = ref(null)
const isReady = ref(false)

// 检测语言环境
function detectLanguage() {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    isZh.value = !path.includes('/en/')
  }
}

// 获取编辑器内容
function getXmlCode() {
  return editorView.value?.state.doc.toString() || ''
}

// 计算预览 URL - 使用文档站点托管的 WASM
const previewUrl = computed(() => {
  // 使用 /quik-docs/playground/preview.html (GitHub Pages 部署时)
  // 本地开发时使用 /playground/preview.html
  const base = import.meta.env.BASE_URL || '/'
  return `${base}playground/preview.html`
})

function onIframeLoad() {
  // 等待 iframe 内部的 WASM 加载完成
  const checkReady = setInterval(() => {
    try {
      previewFrame.value?.contentWindow?.postMessage({ type: 'ping' }, '*')
    } catch (e) {
      // 跨域错误，忽略
    }
  }, 500)

  // 监听来自 iframe 的消息
  window.addEventListener('message', (event) => {
    if (event.data.type === 'ready') {
      isReady.value = true
      clearInterval(checkReady)
      // 自动运行初始代码
      setTimeout(() => runCode(), 100)
    } else if (event.data.type === 'pong') {
      // iframe 响应了，说明已加载
      isReady.value = true
      clearInterval(checkReady)
      setTimeout(() => runCode(), 100)
    }
  })

  // 5秒后如果还没准备好，也标记为就绪（可能是跨域问题）
  setTimeout(() => {
    if (!isReady.value) {
      isReady.value = true
      runCode()
    }
  }, 5000)
}

function runCode() {
  if (!previewFrame.value) return
  
  try {
    previewFrame.value.contentWindow?.postMessage({
      type: 'loadXml',
      content: getXmlCode()
    }, '*')
  } catch (e) {
    console.error('Failed to send message to iframe:', e)
  }
}

// 初始化 CodeMirror 编辑器
function initEditor() {
  if (!editorContainer.value || editorView.value) return
  
  const runKeymap = keymap.of([{
    key: 'Ctrl-Enter',
    mac: 'Cmd-Enter',
    run: () => { runCode(); return true }
  }])
  
  const state = EditorState.create({
    doc: initialXml.value,
    extensions: [
      lineNumbers(),
      highlightActiveLine(),
      xml(),
      oneDark,
      keymap.of(defaultKeymap),
      runKeymap,
      EditorView.theme({
        '&': { height: '100%' },
        '.cm-scroller': { overflow: 'auto' },
        '.cm-content': { fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace" }
      })
    ]
  })
  
  editorView.value = new EditorView({
    state,
    parent: editorContainer.value
  })
}

onMounted(() => {
  detectLanguage()
  initEditor()
})
</script>

<style scoped>
.quik-playground {
  margin: 24px 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.playground-container {
  display: flex;
  flex-direction: column;
}

.editor-panel,
.preview-panel {
  display: flex;
  flex-direction: column;
}

.editor-panel {
  border-bottom: 1px solid var(--vp-c-divider);
  height: 320px;
}

.preview-panel {
  height: 350px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.panel-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.run-btn {
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.run-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}

.run-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}

.status.ready {
  background: #10b98120;
  color: #10b981;
}

.status.loading {
  background: #f59e0b20;
  color: #f59e0b;
}

.code-editor {
  flex: 1;
  width: 100%;
  overflow: hidden;
}

.code-editor :deep(.cm-editor) {
  height: 100%;
  font-size: 14px;
}

.code-editor :deep(.cm-scroller) {
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  line-height: 1.6;
}

.preview-container {
  flex: 1;
  background: #f5f5f5;
  position: relative;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: white;
}
</style>
