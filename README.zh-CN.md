# 长文节目工具箱

[历史节目：为什么火车改变了我们的时间？](learning/railway-time/README.md)。完整中文听稿、事实核查表、两家机构史料和8分05秒AI合成音频；Mac生成，非iPhone录音。

[学习素材：平均数与中位数](learning/mean-median/README.md)。完整原创听稿、学习提示词、来源和已核对的虚构练习，以及单独提供的[8分17秒中文AI合成音频](https://github.com/GODGOD126/listening-script-kit/releases/tag/zh-audio-demo-20261004)，展示知识讲解型长文用途。音频在Mac端生成，非iPhone录音；不承诺学习效果。工具箱本身仍只处理文字。

AI 已经写好了几千字长文，怎样把它整理成可以直接听的节目稿？这个工具箱提供三个步骤：写一个合适的提示词，检查听起来可能不方便的格式，把正文和参考资料分开导出。

[直接打开中文工具箱](https://godgod126.github.io/listening-script-kit/?lang=zh) · [English live toolkit](https://godgod126.github.io/listening-script-kit/)

[下载 v1.3.0 完整 ZIP](https://github.com/GODGOD126/listening-script-kit/releases/download/v1.3.0/listening-script-kit-v1.3.0.zip) · [版本说明](https://github.com/GODGOD126/listening-script-kit/releases/tag/v1.3.0)
先把整个文件夹解压，再打开 `index.html`；直接在压缩包里打开可能缺少脚本。文件包只含这个公开工具箱，不含 App 工程或语音模型。手机上可以直接使用上方在线入口。

下载整个项目，直接打开 `index.html`，选择中文即可使用。**不用注册、不需要密钥、不上传文稿、不调用 AI、不生成语音，也不保存输入。** 所有处理在当前浏览器内完成，无需安装依赖或启动服务器。

1. 选择节目类型和主题，补上可核查的资料，生成提示词。再把提示词复制到你自己选择的 AI 工具。这里不会替你联系或上传到那个工具。
2. 将得到的逐字稿粘贴到检查区。工具提示长段落、网址、表格、代码和可能的公式，不擅自改写或删除原文。这些是建议，不是事实或发音检查。
3. 标题、逐字稿和参考资料分别填写。复制或下载 TXT 时，只导出标题和正文；参考资料可以另存一个 TXT。

自动复制不可用时，可使用“手动复制”或下载 TXT。关闭页面会丢失未保存内容；工具不会使用浏览器存储。长文检查一次最多十万个 Unicode 字符，超限只提示，不截断原文。提示词资料区上限一万五千字符，超限时先提示，不静默丢弃资料。

[直接在浏览器收听完整中文示范](https://godgod126.github.io/listening-script-kit/learning/mean-median/)，无需注册或购买App；可下载实际生成稿。AI合成声音、Mac端生成，非iPhone录音。

## 先用完整示范试一遍

在线与离线工具箱都内置地图、二维码及《弗兰肯斯坦》书籍解读三主题的中英文完整文稿和来源。选择示范后可填入检查区逐字稿、节目标题、朗读正文与参考资料四栏；已有不同文字时先保留，只有明确选择替换才改动这四栏。切换主题或语言本身不会改输入，也不替换提示词区内容。对应节目音频页已撤下；产品页仍保留原有四段中文声音示范，与这些文稿不是同一期节目。工具箱不含声音模型或音频文件。

## 给AI使用的听稿技能

[阅读 listening-script 技能](skills/listening-script/SKILL.md) · [查看表格与不确定性的改写示例](skills/listening-script/references/worked-example.md)

这份技能用于把研究报告、文章、读书笔记和AI草稿整理为听稿，保留数字、归属、证据范围和你要求的详细程度。它将来源与正文分开，不往你的节目里强塞产品广告。技能只包含文字指导，不执行脚本、不调用接口、不生成声音，也不访问账号。

可以把 `skills/listening-script` 文件夹复制到你使用的Agent技能目录，或通过[开放技能CLI](https://skills.sh/docs)安装：

```sh
npx skills add GODGOD126/listening-script-kit --skill listening-script
```

CLI是另一个工具，会从GitHub下载文件。安装前先阅读技能，按CLI提示选择你的Agent和安装范围；可用 `DISABLE_TELEMETRY=1` 关闭其安装统计。直接使用浏览器工具箱无需安装。

请求示例：“用 listening-script 把这篇研究报告变成中文听稿，保留细节和证据边界，把表格关系讲成完整句子，网址与待核查项另放一份备注。”

[三种可直接复制的中文请求](skills/listening-script/references/chinese-starters.md)：把已有读书笔记整理成听稿、按明确日期整理AI资讯、围绕来源写历史问题讲解。每种都说明要提供什么材料、允许改写到什么程度，以及资料不足时怎么处理。它们是请求模板，不是实时新闻或生成过的节目。

## 为什么不直接删掉网址、表格和引用

这些内容可能是正文的重要证据。语音不方便读出某种格式，不代表它没有价值。工具只标明值得人工看一看的位置，是否改成口语、是否移到参考资料区，由你来决定。

## 可独立复用的源码

`lib/` 提供提示词生成、文本检查和纯文字导出函数。`examples/` 是两份中英文单文件 HTML 示例，可独立打开。已安装 Node 时，运行 `npm test` 可检查代表性输入、Unicode 字符、超限、网址和导出边界；不用先执行安装。

代码及原创示例采用 MIT 许可。第三方链接内容仍按其来源的规定使用。这里没有「自听」App源码、模型或私有资料。

## 原有声音试听

[听原有四段中文声音示范](https://mylisten.vibestation.cn/#listen)。这是产品声音展示，与工具箱内的文稿不是同一期节目。原完整节目库和案例页已撤下；地图、二维码与《弗兰肯斯坦》的完整文稿和来源仍内置在工具箱。

本工具箱由「自听」MyListen开发者 Ryan Zhu 提供，AI辅助编写。可以配合其他文字转语音工具使用。

[「自听」](https://mylisten.vibestation.cn/)负责之后的收听环节：将自己的文字在 iPhone 或 iPad 本地变成一期节目，支持锁屏收听、记录进度与续听。声音模型在本地运行，支持导出 M4A。可以下载试用，完整功能通过 App 内购买解锁，**无订阅、无广告**。工具箱的免费 MIT 许可与 App 商业条款是两回事。

[English](README.en.md) · [自听产品介绍](https://mylisten.vibestation.cn/)



## 实现说明

[Unicode字数、原文定位与正文导出的技术说明（英文）](docs/text-review-contracts.md)保留可运行的代码示例、实际核验结果和限制，可独立用于其他文本工具。


《弗兰肯斯坦》示范是依据1818年三卷原著编写的原创书籍解读，含重要情节和结局；原著链接和章节核查单独保留。
