# 长文节目工具箱

AI写好了几千字长文，想把它变成自己能听的节目？这里提供免费听稿准备工具、可复制的中文请求，以及完整音频例子。先听一份，再用自己的主题试一遍。

## 先听两个完整中文例子

- [为什么火车改变了我们的时间？](https://godgod126.github.io/listening-script-kit/learning/railway-time/)：约8分05秒，从铁路讲到标准时间制度；附正文、事实表和机构来源。
- [平均十分钟，为什么没有人等十分钟？](https://godgod126.github.io/listening-script-kit/learning/mean-median/)：约8分17秒，用原创虚构例子讲平均数、中位数和小组比较。

两份音频均为AI合成，在Mac端生成，非iPhone录音或设备性能测试；免费收听，不要求购买App。音频与正文可以分别下载，核验范围在各自说明中保留。

## 用自己的长文开始

1. [打开中文工具箱](https://godgod126.github.io/listening-script-kit/?lang=zh)：生成写作提示词、检查影响收听的文本格式、把正文和参考资料分开导出。
2. [复制一份中文请求](skills/listening-script/references/chinese-starters.md)：已有读书笔记、明确日期的AI资讯、有来源的历史问题。替换资料、篇幅和允许改写范围，再交给你选定的AI工具。
3. 保存并核对听稿，再使用你自己的文字转语音工具收听。

**工具箱不调用AI、不生成声音、不上传文稿、不需要账号或密钥。** 文本处理在当前浏览器内完成；关闭页面会丢失未保存输入。你使用的其他AI与语音工具另按其规则运行。

[中文详细说明](README.zh-CN.md) · [v1.3.0离线工具箱ZIP](https://github.com/GODGOD126/listening-script-kit/releases/download/v1.3.0/listening-script-kit-v1.3.0.zip) · [版本说明](https://github.com/GODGOD126/listening-script-kit/releases/tag/v1.3.0)

离线ZIP是工具箱1.3.0版本，解压完整文件夹后打开index.html。上面新增的中文请求在当前源码中，两份音频另行提供；ZIP不包含App工程或语音模型。

## 已经在使用Agent？

[listening-script技能](skills/listening-script/SKILL.md)把已有材料整理成适合听的文字，保留数字、来源归属和不确定性。[虚构报告对照例子](skills/listening-script/references/worked-example.md)展示表格如何变成口语，且不丢失测试范围。

技能只有文字指导，不执行脚本、不请求密钥、不合成音频，也不会在你的节目稿中自动加入产品广告。如何安装、启用和使用请看[中文说明](README.zh-CN.md#给ai使用的听稿技能)。

## 听稿之后的收听环节

本项目由「自听」MyListen开发者 Ryan Zhu 提供，AI辅助编写；可以与其他收听工具配合使用。

[「自听」](https://mylisten.vibestation.cn/)将自己的文字在iPhone或iPad本地生成、保存为音频，支持锁屏收听、记录进度、续听和导出M4A。可下载试用，完整功能通过App内购买解锁，**无订阅、无广告**。

[中国区App Store](https://apps.apple.com/cn/app/id6790382144) · [原有四段中文声音示范](https://mylisten.vibestation.cn/#listen)

这个免费工具箱与原创请求采用[MIT许可](LICENSE)，App商业条款另行适用；第三方来源保留其版权与使用条件。工具不替代事实、版权或真人听感核验。

## 源码与说明

工具无依赖，已有Node时运行npm test检查文本、Unicode、导出和原文保护。核心代码在lib/，单文件示例在examples/，完整听稿与来源在learning/；[技术说明](docs/text-review-contracts.md)保留实现边界。

[English documentation](README.en.md) · [完整中文使用说明](README.zh-CN.md)
