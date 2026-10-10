"""Build a curated public RSS for a new Apple Podcasts submission.
Existing general feed and episode files are not modified.
"""
from pathlib import Path
from copy import deepcopy
import xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/'podcast'
NS={'i':'http://www.itunes.com/dtds/podcast-1.0.dtd','a':'http://www.w3.org/2005/Atom'}
ET.register_namespace('itunes',NS['i']); ET.register_namespace('atom',NS['a'])
tree=ET.parse(DEST/'feed.xml'); channel=tree.getroot().find('channel')
selected={'calendar-1582','railway-time','mean-median'}
removed=[]
for item in list(channel.findall('item')):
    slug=item.findtext('guid').rsplit('/',1)[-1]
    if slug not in selected:
        channel.remove(item); removed.append(slug)
    else:
        assert 'AI合成' in item.findtext('description'), 'Metadata disclosure required'
assert len(channel.findall('item'))==3
channel.find('description').text=('给普通中文听众的三期完整知识节目：日历怎样改变日期，火车为何改变时间，以及平均数为何不同于典型经历。'
    '历史与生活科普，可在通勤、散步时收听。Ryan Zhu与AI辅助制作文稿，声音由AI合成，原始来源、文稿和核验范围在各单集页面。'
    '音频在Mac使用自听归档模型生成，非当前iPhone录音或性能测试。由「自听」MyListen开发者提供；节目免费收听，不要求购买App。'
    'App可免费下载试用，完整功能内购解锁，无订阅、无广告。')
base='https://godgod126.github.io/listening-script-kit/podcast/'
channel.find('i:image',NS).set('href',base+'apple-cover-v1.png')
channel.find('image/url').text=base+'apple-cover-v1.png'
channel.find('a:link',NS).set('href',base+'apple-feed.xml')
ET.indent(tree,space='  ')
tree.write(DEST/'apple-feed.xml',encoding='utf-8',xml_declaration=True)
print('Built 3 selected existing complete episodes; unchanged GUIDs, enclosure URLs and publication dates.')
