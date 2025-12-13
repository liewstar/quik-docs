# 表单示例

本章展示使用 Quik 构建各种表单的示例。

## 用户注册表单

### XML 文件 (register.xml)

```xml
<Panel>
    <GroupBox title="账户信息">
        <LineEdit title="用户名" var="txtUsername" placeholder="4-20个字符"/>
        <LineEdit title="密码" var="txtPassword" placeholder="至少6个字符"/>
        <LineEdit title="确认密码" var="txtConfirm" placeholder="再次输入密码"/>
        <LineEdit title="邮箱" var="txtEmail" placeholder="example@email.com"/>
    </GroupBox>
    
    <GroupBox title="个人信息">
        <LineEdit title="姓名" var="txtName"/>
        <ComboBox title="性别" var="cboGender" default="male">
            <Choice text="男" val="male"/>
            <Choice text="女" val="female"/>
            <Choice text="其他" val="other"/>
        </ComboBox>
        <SpinBox title="年龄" var="spnAge" min="1" max="150" default="18"/>
        <LineEdit title="电话" var="txtPhone" placeholder="可选"/>
    </GroupBox>
    
    <GroupBox title="协议">
        <CheckBox title="我已阅读并同意用户协议" var="chkAgree"/>
        <CheckBox title="订阅邮件通知" var="chkSubscribe" default="1"/>
    </GroupBox>
    
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="注册" var="btnRegister"/>
        <PushButton text="取消" var="btnCancel"/>
    </HLayoutWidget>
</Panel>
```

### C++ 代码

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include <QMessageBox>
#include "Quik/Quik.h"

class RegisterDialog : public QDialog {
public:
    RegisterDialog() {
        setWindowTitle("用户注册");
        resize(400, 500);
        
        auto* layout = new QVBoxLayout(this);
        
        ui = Quik_BUILD(builder, "register.xml");
        layout->addWidget(ui);
        
        vm = new Quik::QuikViewModel(&builder);
        
        // 定义访问器
        username = vm->var<QString>("txtUsername");
        password = vm->var<QString>("txtPassword");
        confirm = vm->var<QString>("txtConfirm");
        email = vm->var<QString>("txtEmail");
        name = vm->var<QString>("txtName");
        gender = vm->var<QString>("cboGender");
        age = vm->var<int>("spnAge");
        phone = vm->var<QString>("txtPhone");
        agree = vm->var<bool>("chkAgree");
        subscribe = vm->var<bool>("chkSubscribe");
        
        // 连接按钮
        builder.connectButton("btnRegister", [this]() { onRegister(); });
        builder.connectButton("btnCancel", [this]() { reject(); });
    }
    
private:
    void onRegister() {
        // 验证
        if (username().length() < 4 || username().length() > 20) {
            QMessageBox::warning(this, "错误", "用户名长度应为4-20个字符");
            return;
        }
        
        if (password().length() < 6) {
            QMessageBox::warning(this, "错误", "密码至少6个字符");
            return;
        }
        
        if (password() != confirm()) {
            QMessageBox::warning(this, "错误", "两次密码输入不一致");
            return;
        }
        
        if (!email().contains("@")) {
            QMessageBox::warning(this, "错误", "请输入有效的邮箱地址");
            return;
        }
        
        if (!agree) {
            QMessageBox::warning(this, "错误", "请阅读并同意用户协议");
            return;
        }
        
        // 注册成功
        QString info = QString(
            "注册成功！\n\n"
            "用户名: %1\n"
            "邮箱: %2\n"
            "姓名: %3\n"
            "性别: %4\n"
            "年龄: %5\n"
            "订阅: %6"
        ).arg(username())
         .arg(email())
         .arg(name())
         .arg(gender())
         .arg(age())
         .arg(subscribe() ? "是" : "否");
        
        QMessageBox::information(this, "成功", info);
        accept();
    }
    
    Quik::XMLUIBuilder builder;
    Quik::QuikViewModel* vm;
    QWidget* ui;
    
    Quik::Var<QString> username, password, confirm, email, name, gender, phone;
    Quik::Var<int> age;
    Quik::Var<bool> agree, subscribe;
};

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    RegisterDialog dialog;
    return dialog.exec();
}
```

## 设置面板

### XML 文件 (settings.xml)

```xml
<Panel>
    <TabBar var="tabSettings">
        <Tab title="常规" val="general">
            <GroupBox title="界面">
                <ComboBox title="语言" var="cboLanguage" default="zh">
                    <Choice text="简体中文" val="zh"/>
                    <Choice text="English" val="en"/>
                    <Choice text="日本語" val="ja"/>
                </ComboBox>
                <ComboBox title="主题" var="cboTheme" default="light">
                    <Choice text="浅色" val="light"/>
                    <Choice text="深色" val="dark"/>
                    <Choice text="跟随系统" val="system"/>
                </ComboBox>
                <SpinBox title="字体大小" var="spnFontSize" min="8" max="24" default="12"/>
            </GroupBox>
            
            <GroupBox title="启动">
                <CheckBox title="开机自启动" var="chkAutoStart"/>
                <CheckBox title="启动时检查更新" var="chkCheckUpdate" default="1"/>
                <CheckBox title="启动时显示欢迎页" var="chkShowWelcome" default="1"/>
            </GroupBox>
        </Tab>
        
        <Tab title="网络" val="network">
            <GroupBox title="代理设置">
                <ComboBox title="代理类型" var="cboProxy" default="none">
                    <Choice text="不使用代理" val="none"/>
                    <Choice text="HTTP代理" val="http"/>
                    <Choice text="SOCKS5代理" val="socks5"/>
                </ComboBox>
                <LineEdit title="服务器" var="txtProxyHost" visible="$cboProxy!=none"/>
                <SpinBox title="端口" var="spnProxyPort" min="1" max="65535" default="8080" 
                         visible="$cboProxy!=none"/>
                <CheckBox title="需要认证" var="chkProxyAuth" visible="$cboProxy!=none"/>
                <LineEdit title="用户名" var="txtProxyUser" 
                          visible="$cboProxy!=none and $chkProxyAuth==1"/>
                <LineEdit title="密码" var="txtProxyPass" 
                          visible="$cboProxy!=none and $chkProxyAuth==1"/>
            </GroupBox>
        </Tab>
        
        <Tab title="高级" val="advanced">
            <GroupBox title="性能">
                <CheckBox title="启用硬件加速" var="chkHardwareAccel" default="1"/>
                <SpinBox title="缓存大小(MB)" var="spnCacheSize" min="64" max="4096" default="512"/>
                <SpinBox title="最大线程数" var="spnMaxThreads" min="1" max="32" default="4"/>
            </GroupBox>
            
            <GroupBox title="调试">
                <CheckBox title="启用调试模式" var="chkDebug"/>
                <ComboBox title="日志级别" var="cboLogLevel" default="info" visible="$chkDebug==1">
                    <Choice text="错误" val="error"/>
                    <Choice text="警告" val="warn"/>
                    <Choice text="信息" val="info"/>
                    <Choice text="调试" val="debug"/>
                </ComboBox>
                <LineEdit title="日志路径" var="txtLogPath" visible="$chkDebug==1"/>
            </GroupBox>
        </Tab>
    </TabBar>
    
    <HLayoutWidget>
        <PushButton text="恢复默认" var="btnReset"/>
        <addStretch/>
        <PushButton text="应用" var="btnApply"/>
        <PushButton text="取消" var="btnCancel"/>
    </HLayoutWidget>
</Panel>
```

### C++ 代码

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include <QSettings>
#include <QMessageBox>
#include "Quik/Quik.h"

class SettingsDialog : public QDialog {
public:
    SettingsDialog() {
        setWindowTitle("设置");
        resize(500, 400);
        
        auto* layout = new QVBoxLayout(this);
        ui = Quik_BUILD(builder, "settings.xml");
        layout->addWidget(ui);
        
        vm = new Quik::QuikViewModel(&builder);
        
        // 加载设置
        loadSettings();
        
        // 连接按钮
        builder.connectButton("btnApply", [this]() { saveSettings(); accept(); });
        builder.connectButton("btnCancel", [this]() { reject(); });
        builder.connectButton("btnReset", [this]() { resetToDefault(); });
    }
    
private:
    void loadSettings() {
        QSettings s;
        
        vm->var<QString>("cboLanguage") = s.value("language", "zh").toString();
        vm->var<QString>("cboTheme") = s.value("theme", "light").toString();
        vm->var<int>("spnFontSize") = s.value("fontSize", 12).toInt();
        vm->var<bool>("chkAutoStart") = s.value("autoStart", false).toBool();
        vm->var<bool>("chkCheckUpdate") = s.value("checkUpdate", true).toBool();
        vm->var<bool>("chkShowWelcome") = s.value("showWelcome", true).toBool();
        
        vm->var<QString>("cboProxy") = s.value("proxyType", "none").toString();
        vm->var<QString>("txtProxyHost") = s.value("proxyHost", "").toString();
        vm->var<int>("spnProxyPort") = s.value("proxyPort", 8080).toInt();
        
        vm->var<bool>("chkHardwareAccel") = s.value("hardwareAccel", true).toBool();
        vm->var<int>("spnCacheSize") = s.value("cacheSize", 512).toInt();
        vm->var<int>("spnMaxThreads") = s.value("maxThreads", 4).toInt();
        vm->var<bool>("chkDebug") = s.value("debug", false).toBool();
    }
    
    void saveSettings() {
        QSettings s;
        
        s.setValue("language", vm->var<QString>("cboLanguage")());
        s.setValue("theme", vm->var<QString>("cboTheme")());
        s.setValue("fontSize", vm->var<int>("spnFontSize")());
        s.setValue("autoStart", vm->var<bool>("chkAutoStart")());
        s.setValue("checkUpdate", vm->var<bool>("chkCheckUpdate")());
        s.setValue("showWelcome", vm->var<bool>("chkShowWelcome")());
        
        s.setValue("proxyType", vm->var<QString>("cboProxy")());
        s.setValue("proxyHost", vm->var<QString>("txtProxyHost")());
        s.setValue("proxyPort", vm->var<int>("spnProxyPort")());
        
        s.setValue("hardwareAccel", vm->var<bool>("chkHardwareAccel")());
        s.setValue("cacheSize", vm->var<int>("spnCacheSize")());
        s.setValue("maxThreads", vm->var<int>("spnMaxThreads")());
        s.setValue("debug", vm->var<bool>("chkDebug")());
        
        QMessageBox::information(this, "提示", "设置已保存");
    }
    
    void resetToDefault() {
        vm->var<QString>("cboLanguage") = "zh";
        vm->var<QString>("cboTheme") = "light";
        vm->var<int>("spnFontSize") = 12;
        vm->var<bool>("chkAutoStart") = false;
        vm->var<bool>("chkCheckUpdate") = true;
        vm->var<bool>("chkShowWelcome") = true;
        
        vm->var<QString>("cboProxy") = "none";
        vm->var<QString>("txtProxyHost") = "";
        vm->var<int>("spnProxyPort") = 8080;
        
        vm->var<bool>("chkHardwareAccel") = true;
        vm->var<int>("spnCacheSize") = 512;
        vm->var<int>("spnMaxThreads") = 4;
        vm->var<bool>("chkDebug") = false;
    }
    
    Quik::XMLUIBuilder builder;
    Quik::QuikViewModel* vm;
    QWidget* ui;
};

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    app.setOrganizationName("MyCompany");
    app.setApplicationName("MyApp");
    
    SettingsDialog dialog;
    return dialog.exec();
}
```

## 搜索过滤表单

### XML 文件 (search.xml)

```xml
<Panel>
    <GroupBox title="搜索条件">
        <LineEdit title="关键词" var="txtKeyword" placeholder="输入搜索关键词"/>
        
        <ComboBox title="分类" var="cboCategory" default="all">
            <Choice text="全部" val="all"/>
            <Choice text="文档" val="doc"/>
            <Choice text="图片" val="image"/>
            <Choice text="视频" val="video"/>
            <Choice text="音频" val="audio"/>
        </ComboBox>
        
        <CheckBox title="高级搜索" var="chkAdvanced"/>
    </GroupBox>
    
    <GroupBox title="高级选项" visible="$chkAdvanced==1">
        <ComboBox title="时间范围" var="cboTimeRange" default="any">
            <Choice text="不限" val="any"/>
            <Choice text="今天" val="today"/>
            <Choice text="本周" val="week"/>
            <Choice text="本月" val="month"/>
            <Choice text="今年" val="year"/>
        </ComboBox>
        
        <HLayoutWidget>
            <DoubleSpinBox title="最小大小(MB)" var="dspMinSize" min="0" max="10000" default="0"/>
            <DoubleSpinBox title="最大大小(MB)" var="dspMaxSize" min="0" max="10000" default="100"/>
        </HLayoutWidget>
        
        <CheckBox title="仅搜索文件名" var="chkNameOnly"/>
        <CheckBox title="区分大小写" var="chkCaseSensitive"/>
        <CheckBox title="使用正则表达式" var="chkRegex"/>
    </GroupBox>
    
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="搜索" var="btnSearch"/>
        <PushButton text="清除" var="btnClear"/>
    </HLayoutWidget>
</Panel>
```

### C++ 代码

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include "Quik/Quik.h"

struct SearchParams {
    QString keyword;
    QString category;
    QString timeRange;
    double minSize;
    double maxSize;
    bool nameOnly;
    bool caseSensitive;
    bool useRegex;
};

class SearchDialog : public QDialog {
public:
    SearchDialog() {
        setWindowTitle("搜索");
        resize(400, 350);
        
        auto* layout = new QVBoxLayout(this);
        ui = Quik_BUILD(builder, "search.xml");
        layout->addWidget(ui);
        
        vm = new Quik::QuikViewModel(&builder);
        
        builder.connectButton("btnSearch", [this]() { onSearch(); });
        builder.connectButton("btnClear", [this]() { onClear(); });
    }
    
    SearchParams getParams() const { return m_params; }
    
private:
    void onSearch() {
        m_params.keyword = vm->var<QString>("txtKeyword")();
        m_params.category = vm->var<QString>("cboCategory")();
        
        if (vm->var<bool>("chkAdvanced")()) {
            m_params.timeRange = vm->var<QString>("cboTimeRange")();
            m_params.minSize = vm->var<double>("dspMinSize")();
            m_params.maxSize = vm->var<double>("dspMaxSize")();
            m_params.nameOnly = vm->var<bool>("chkNameOnly")();
            m_params.caseSensitive = vm->var<bool>("chkCaseSensitive")();
            m_params.useRegex = vm->var<bool>("chkRegex")();
        }
        
        accept();
    }
    
    void onClear() {
        vm->var<QString>("txtKeyword") = "";
        vm->var<QString>("cboCategory") = "all";
        vm->var<bool>("chkAdvanced") = false;
        vm->var<QString>("cboTimeRange") = "any";
        vm->var<double>("dspMinSize") = 0;
        vm->var<double>("dspMaxSize") = 100;
        vm->var<bool>("chkNameOnly") = false;
        vm->var<bool>("chkCaseSensitive") = false;
        vm->var<bool>("chkRegex") = false;
    }
    
    Quik::XMLUIBuilder builder;
    Quik::QuikViewModel* vm;
    QWidget* ui;
    SearchParams m_params;
};

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    SearchDialog dialog;
    if (dialog.exec() == QDialog::Accepted) {
        SearchParams params = dialog.getParams();
        qDebug() << "搜索关键词:" << params.keyword;
        qDebug() << "分类:" << params.category;
    }
    
    return 0;
}
```
