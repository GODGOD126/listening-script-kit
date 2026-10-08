"""Build RSS and a Chinese subscription guide; no network or dependencies."""
import html
import json
import xml.etree.ElementTree as ET
from datetime import datetime
from email.utils import format_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'podcast'
data = json.loads((DEST / 'catalog.json').read_text('utf-8'))
BASE = data['baseUrl']
IT = 'http://www.itunes.com/dtds/podcast-1.0.dtd'
ATOM = 'http://www.w3.org/2005/Atom'
ET.register_namespace('itunes', IT)
ET.register_namespace('atom', ATOM)
def tag(parent, name, value):
    node = ET.SubElement(parent, name)
    node.text = str(value)
    return node
def it(name):
    return '{' + IT + '}' + name
def duration(value):
    seconds = round(value)
    return f'{seconds // 60}分{seconds % 60:02d}秒'

disclosure = ('Ryan Zhu与AI辅助制作文稿，声音由AI合成，在Mac使用自听归档模型生成，'
              '非当前iPhone录音或性能测试。原始来源、文稿和核验范围在单集页面。'
              '由「自听」MyListen开发者提供；音频免费收听，不要求购买App。'
              'App可免费下载试用，完整功能内购解锁，无订阅、无广告。')
rss = ET.Element('rss', version='2.0')
channel = ET.SubElement(rss, 'channel')
tag(channel, 'title', data['title'])
tag(channel, 'link', BASE + 'podcast/')
tag(channel, 'description', '有来源的中文长文，整理成能连续听的节目。历史、学习与读书；正文和请求可独立复用。' + disclosure)
tag(channel, 'language', data['language'])
tag(channel, 'lastBuildDate', format_datetime(datetime.fromisoformat(data.get('updatedAt', data['createdAt']))))
tag(channel, it('author'), 'Ryan Zhu')
tag(channel, it('explicit'), 'false')
tag(channel, it('type'), 'episodic')
ET.SubElement(channel, it('image'), href=BASE + 'podcast/cover.png')
ET.SubElement(channel, it('category'), text='Education')
ET.SubElement(channel, '{' + ATOM + '}link', href=BASE + 'podcast/feed.xml', rel='self', type='application/rss+xml')
image = ET.SubElement(channel, 'image')
tag(image, 'url', BASE + 'podcast/cover.png')
tag(image, 'title', data['title'])
tag(image, 'link', BASE + 'podcast/')
cards = []
seen = set()
for row in data['episodes']:
    slug = row['slug']
    relative = row.get('directory', f'learning/{slug}')
    path = ROOT / relative / row['file']
    assert path.resolve().is_relative_to(ROOT.resolve()), 'Audio must stay inside repository'
    assert path.stat().st_size == row['bytes'], f'Audio length drift: {slug}'
    url = BASE + relative.strip('/') + '/'
    media = url + row['file']
    assert media not in seen
    seen.add(media)
    item = ET.SubElement(channel, 'item')
    tag(item, 'title', row['title'])
    tag(item, 'link', url)
    tag(item, 'description', row['description'] + '\n\n' + disclosure + '\n\n完整文稿和来源：' + url)
    guid = tag(item, 'guid', BASE + 'podcast/episode/' + slug)
    guid.set('isPermaLink', 'false')
    # This is the first feed inclusion, not an invented original publication date.
    tag(item, 'pubDate', format_datetime(datetime.fromisoformat(row['addedToFeedAt'])))
    ET.SubElement(item, 'enclosure', url=media, length=str(row['bytes']), type='audio/mpeg')
    tag(item, it('duration'), round(row['seconds']))
    tag(item, it('explicit'), 'false')
    cards.append(f'<article><p class="note">{duration(row["seconds"])}</p><h3><a href="{html.escape(url)}">{html.escape(row["title"])}</a></h3><p>{html.escape(row["description"])}</p><p><a href="{html.escape(media)}" download>下载完整MP3</a> · <a href="{html.escape(url)}">收听、文稿与来源</a></p></article>')
ET.indent(rss, space='  ')
ET.ElementTree(rss).write(DEST / 'feed.xml', encoding='utf-8', xml_declaration=True)
page = '''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>自听知识听稿｜中文音频RSS订阅</title><meta name="description" content="五份完整中文历史、学习和读书音频，免费手动订阅。附文稿、来源和可复制听稿请求。"><link rel="canonical" href="BASEpodcast/"><style>*{box-sizing:border-box}body{background:#faf5ec;color:#2d2922;margin:0;font:19px/1.8 system-ui,'Microsoft YaHei',sans-serif}main{max-width:820px;margin:auto;padding:36px 24px}h1{font-size:clamp(32px,6vw,46px);line-height:1.3}h2{font-size:27px}h3{font-size:23px}a{color:#7c4822;text-underline-offset:4px}.note{font-size:16px;color:#62584e}section,article{background:white;border:1px solid #e2d7c8;border-radius:18px;padding:24px;margin:24px 0}.cover{float:right;width:125px;height:125px;border-radius:20px;margin:0 0 16px 20px}input{display:block;width:100%;font:16px/1.6 system-ui;padding:12px;border:1px solid #b6a78f;border-radius:8px}button{font:inherit;padding:10px 16px;margin:12px 0;background:#7c4822;color:white;border:0;border-radius:10px;cursor:pointer}button:focus-visible,a:focus-visible,input:focus-visible{outline:3px solid #9a6638;outline-offset:4px}footer{border-top:1px solid #e2d7c8;padding:20px 0}li{margin:8px 0}@media(max-width:420px){main{padding:26px 18px}section,article{padding:18px}.cover{width:88px;height:88px}body{font-size:18px}}</style></head><body><main><img class="cover" src="cover.png" alt="自听知识听稿，AI概念封面" width="125" height="125"><p class="note">完整中文音频 · 免费收听 · 无需账号</p><h1>把这些长文，<br>放进你的播放器。</h1><p>历史、学习与读书，不止是一段试听。现有五期共约40分钟，文稿、来源和写作请求也能下载。</p><section aria-label="手动订阅"><h2>复制地址，手动关注</h2><label for="feed">RSS订阅地址</label><input id="feed" readonly value="BASEpodcast/feed.xml"><button id="copy" type="button">选中RSS地址</button><p id="copy-status" role="status" aria-live="polite"></p><ol><li>在iPhone的Apple播客中，打开“资料库”。</li><li>点省略号按钮，选择“通过URL关注节目”。</li><li>粘贴上面的地址，按播放器提示关注。</li></ol><p class="note">菜单可能随版本和语言变化。其他支持RSS的播放器也可尝试：寻找“添加订阅”或“通过URL添加”。</p><p><a href="feed.xml">直接打开RSS文件</a> · <a href="https://podcasters.apple.com/zh-cn/support/5108-how-apple-podcasts-distributes-your-shows-to-listeners">Apple官方手动关注说明</a></p><p class="note">这是可公开访问的手动订阅Feed，尚未提交Apple播客目录。不能据此在播客目录搜索到节目，也没有Apple播客分析数据。Feed和音频接口已核验；尚未在iPhone客户端完成实际订阅测试。封面为1254×1254概念图，不声称满足正式目录封面规范。网络及客户端支持以实际使用为准。</p></section><h2>现有五期</h2>CARDS<section><h2>更想听你自己的主题？</h2><p>每期页面都有完整文稿、来源与可复制请求。选一个你想理解的问题，先把可靠资料交给AI整理成连续听稿，再核对数字、来源与不确定性。</p><p>这些声音由AI合成，文稿由Ryan Zhu与AI辅助制作，在Mac使用「自听」归档模型生成；不是当前iPhone录音或性能测试。原音轨没有因为加入RSS重新生成，RSS日期表示首次加入本订阅，不等于原制作日期。</p><p>这里公开的是可分享的示范。自己的私人材料无需上传到这份Feed；请在自己的工具和设备里处理，并尊重资料版权。</p><p><a href="../?lang=zh">打开中文听稿准备工具箱</a> · <a href="../examples/markdown-notes-zh/">看Markdown笔记改写示范</a></p></section><footer><p>我是「自听」MyListen开发者Ryan Zhu。App在iPhone本地把长文生成可保存的自然声音，支持锁屏收听和进度续听。无订阅、无广告；可免费下载试用，完整功能通过App内购买解锁。</p><p><a href="https://apps.apple.com/cn/app/id6790382144">查看中国区App Store</a> · <a href="https://github.com/GODGOD126/listening-script-kit/tree/main/podcast">RSS与来源代码</a></p><p class="note">这些节目免费收听，不要求购买App。本站没有新增追踪脚本，不承诺更新频率或收听效果。原稿按仓库许可，第三方来源保留原有权利。</p></footer></main><script>document.getElementById('copy').addEventListener('click',()=>{const input=document.getElementById('feed'),status=document.getElementById('copy-status');input.focus();input.select();status.textContent='地址已选中，请按复制，再到播放器里粘贴。';});</script></body></html>'''
count = len(data['episodes'])
minutes = round(sum(row['seconds'] for row in data['episodes']) / 60)
page = page.replace('五份', f'{count}份').replace('五期', f'{count}期').replace('约40分钟', f'约{minutes}分钟')
page = page.replace('BASE', BASE).replace('CARDS', '\n'.join(cards))
(DEST / 'index.html').write_text(page, 'utf-8')
print(f'RSS and Chinese subscription guide built: {count} unique existing audio enclosures.')
