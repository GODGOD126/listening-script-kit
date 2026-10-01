(function () {
  'use strict';
  const $=id=>document.getElementById(id);
  let lang='en',lastReview='';
  const words={
    en:{heading:'A long text. A listenable script.',intro:'Prepare a prompt, review your writing, and keep sources outside the narration.',privacy:'Local-only. No upload, account, tracking, AI calls, or speech generation. Unsaved input is lost when you close this page.',step1:'1 · Writing prompt',step2:'2 · Review a draft',step3:'3 · Export narration',promptTag:'01 / WRITE FOR LISTENING',promptHeading:'Ask for the episode you want.',promptIntro:'Copy the finished prompt to your preferred AI tool. Nothing is sent there from this page.',genre:'Episode type',length:'Approximate length',topic:'What would you like to listen to?',sources:'Source notes or material (up to 15,000 characters)',build:'Build a prompt',promptOutput:'Your prompt',copyPrompt:'Copy prompt',manual:'Manual copy',reviewTag:'02 / REVIEW THE SPOKEN SCRIPT',reviewHeading:'Will it work without a screen?',reviewIntro:'Paste the spoken script. Review long paragraphs, links, tables, code, and formulas. Suggestions do not rewrite text or verify its facts or pronunciation.',draft:'Spoken script (up to 100,000 characters)',check:'Review draft',transfer:'Use this text for export',exportTag:'03 / KEEP NARRATION AND SOURCES SEPARATE',exportHeading:'Export only what should be read aloud.',title:'Episode title (optional)',body:'Narration',references:'References, dates, and checks — separate from narration',copyScript:'Copy narration',downloadScript:'Download narration TXT',downloadReferences:'Download reference notes',manualLabel:'Select this text and copy it manually.',nextHeading:'Then listen to a complete episode.',nextIntro:'A complete Voyager example includes matching scripts, sources, and English and Chinese audio. Prepared with AI assistance and checked against NASA material.',caseLink:'Try the complete example →',disclosure:'Created by Ryan Zhu, developer of 「自听」MyListen, with AI assistance. The kit is free under the MIT license and works with other listening tools too.',appLink:'About 「自听」MyListen',appFacts:'MyListen generates saved audio locally on iPhone and iPad. Download and try it; full features unlock through an in-app purchase. No subscription and no ads. The app is separate from this free kit.',footer:'Your source notes stay on this device. Opening external links or using another AI tool is a separate action.',sourceLimit:'The source notes exceed 15,000 characters. Shorten or split them before building a prompt. Nothing has been removed.',promptReady:'Prompt ready. Review it, then copy it to your chosen AI writing tool.',copyReady:'Copied. If another app receives different text, use Manual copy or TXT.',selectReady:'Text selected. Use your usual copy shortcut or touch-menu Copy.',copyFallback:'Automatic copy unavailable. Select and copy the full text below, or download TXT.',empty:'Enter a spoken script first.',promptEmpty:'Build a prompt first.',limit:'The draft exceeds 100,000 characters. Split it into sections; your text has not been changed.',clean:'No patterns found. This is not a fact or pronunciation check; listen to a short passage too.',found:'places to review. Your text has not been changed.',line:'Line',find:'Find in text',changed:'Text changed. Review again to refresh suggestions.',transferReady:'Current draft copied unchanged to the narration field. Fill in a title and keep sources in the separate field.',transferBlocked:'The narration field already contains different text. Keep or replace it yourself; nothing was overwritten.',downloadReady:'TXT download started. Check your browser downloads.',referencesEmpty:'Add reference notes before downloading them.',more:'Only the first 80 suggestions are shown. Split a long draft to review the rest.',types:{long:'Long paragraph: consider a clearer pause or transition.',link:'Web link: keep a reference separately if it should not be read aloud.',table:'Possible table: explain the comparison in spoken sentences.',code:'Code fence: explain the code, rather than reading its syntax.',unclosed:'Unclosed code fence: check the Markdown formatting.',formula:'Possible formula: decide how to explain it in speech.'}},
    zh:{heading:'一篇长文，变成一份能听的稿。',intro:'先写提示词，再检查听稿，把参考资料留在正文之外。',privacy:'只在当前浏览器处理。不上传、不注册、不追踪、不调用AI、不生成语音。关闭页面会丢失未保存输入。',step1:'1 · 写节目提示词',step2:'2 · 检查逐字稿',step3:'3 · 导出朗读稿',promptTag:'01 / 写给耳朵听',promptHeading:'先说清楚，你想听什么。',promptIntro:'将生成的提示词复制到你自己选择的AI工具。本页不会向那个工具发送内容。',genre:'节目类型',length:'大致篇幅',topic:'你想听的主题是什么？',sources:'资料、笔记或原文（最多15,000字符）',build:'生成提示词',promptOutput:'你的提示词',copyPrompt:'复制提示词',manual:'手动复制',reviewTag:'02 / 检查逐字稿',reviewHeading:'不看屏幕，也能听懂吗？',reviewIntro:'粘贴逐字稿，查看长段落、网址、表格、代码和可能的公式。这里只给建议，不改原文，也不核查事实或发音。',draft:'逐字稿（最多100,000字符）',check:'检查逐字稿',transfer:'将这份文字用于导出',exportTag:'03 / 正文与来源分开',exportHeading:'只导出应该读出来的文字。',title:'节目标题（可不填）',body:'朗读正文',references:'参考资料、日期与待核查内容——不进入朗读稿',copyScript:'复制朗读稿',downloadScript:'下载朗读稿TXT',downloadReferences:'下载参考资料TXT',manualLabel:'选中下方完整文字，手动复制。',nextHeading:'再听一期完整的节目。',nextIntro:'旅行者号示范提供对应的逐字稿、来源和中英文完整音频。AI辅助编写，已对照NASA资料核查。',caseLink:'打开完整示范 →',disclosure:'由「自听」MyListen开发者Ryan Zhu提供，AI辅助制作。工具箱采用免费MIT许可，也能配合其他收听工具。',appLink:'了解「自听」MyListen',appFacts:'「自听」在iPhone与iPad本地生成并保存音频节目。可以下载试用，完整功能在App内购买解锁。无订阅、无广告。App与这个免费工具箱分别提供。',footer:'资料留在当前设备。打开外部链接或使用其他AI工具是独立的操作。',sourceLimit:'资料超过15,000字符。请先缩短或分段；工具没有删除任何资料。',promptReady:'提示词已生成。检查后复制到你选择的AI写作工具。',copyReady:'已复制。如果其他App接收到的内容不一致，可使用手动复制或TXT。',selectReady:'文字已选中。请使用通常的复制快捷键，或触摸菜单中的复制。',copyFallback:'自动复制不可用。请手动复制下方完整文字，或下载TXT。',empty:'请先填写逐字稿。',promptEmpty:'请先生成提示词。',limit:'逐字稿超过100,000字符，请分段检查；原文没有被改动或截断。',clean:'没有找到这些格式。这里不是事实或发音检查，仍可先试听一小段。',found:'处值得检查。原文没有被修改。',line:'第',find:'找到原文',changed:'文字已变化，请重新检查。',transferReady:'当前逐字稿已原样放入朗读正文。可补上标题，将参考资料另放一栏。',transferBlocked:'朗读正文已经有不同的文字。请自行保留或替换；工具没有覆盖它。',downloadReady:'已发起TXT下载，请检查浏览器下载记录。',referencesEmpty:'请先填写参考资料，再下载。',more:'这里只展示前80条建议。长文可分段检查其余内容。',types:{long:'段落较长：可考虑停顿或更清楚的过渡。',link:'出现网址：不需要读出的参考链接可单独保留。',table:'可能有表格：可用完整句子解释比较关系。',code:'代码围栏：可解释代码用途，而不逐字读语法。',unclosed:'代码围栏未闭合：请检查Markdown格式。',formula:'可能有公式：决定怎样用口语讲清楚。'}}
  };
  const t=k=>words[lang][k];
  function setLanguage(next){
    const oldGenre=$('genre').value,oldLength=$('length').value;
    lang=next;document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
    $('language').textContent=lang==='en'?'中文':'English';
    $('genre').replaceChildren();
    for(const [key,row] of Object.entries(MyListenPrompts.genres)){
      const option=document.createElement('option');option.value=key;option.textContent=row[lang];$('genre').append(option);
    }
    if(oldGenre)$('genre').value=oldGenre;
    $('length').replaceChildren();
    const lengths=lang==='en'?[900,1800,3000]:[1500,3000,5000];
    for(const length of lengths){const o=document.createElement('option');o.value=String(length);o.textContent=length+(lang==='en'?' words':'字');$('length').append(o);}
    $('length').value=lengths.includes(Number(oldLength))?oldLength:String(lengths[1]);
    $('topic').placeholder=MyListenPrompts.genres[$('genre').value][lang+'Hint'];
    $('case-link').href='https://mylisten.vibestation.cn/guides/voyager-listening-case/'+(lang==='en'?'en/':'');
    $('app-link').href='https://mylisten.vibestation.cn/'+(lang==='en'?'en/':'');
    ['prompt-status','check-status','export-status'].forEach(id=>$(id).textContent='');
    $('issues').replaceChildren();lastReview='';
  }
  function selectField(field,status){field.focus();field.select();status.textContent=t('selectReady');}
  async function copy(text,field,status){
    try{await navigator.clipboard.writeText(text);status.textContent=t('copyReady');}
    catch{if(field===null){$('fallback').hidden=false;$('manual-text').value=text;field=$('manual-text');}selectField(field,status);status.textContent=t('copyFallback');}
  }
  function script(){try{return ListeningNarration.serialize($('title').value,$('body').value);}catch{$('export-status').textContent=t('empty');return null;}}
  function download(text,name){
    const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download=name;document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);$('export-status').textContent=t('downloadReady');
  }
  $('language').addEventListener('click',()=>setLanguage(lang==='en'?'zh':'en'));
  $('genre').addEventListener('change',()=>{$('topic').placeholder=MyListenPrompts.genres[$('genre').value][lang+'Hint'];});
  $('build').addEventListener('click',()=>{
    if($('sources').value.length>15000){$('prompt-status').textContent=t('sourceLimit');return;}
    try{$('prompt-output').value=MyListenPrompts.build({lang,genre:$('genre').value,length:$('length').value,topic:$('topic').value,sources:$('sources').value,tone:'plain',level:'beginner'});$('prompt-status').textContent=t('promptReady');}
    catch(error){$('prompt-status').textContent=error.message;}
  });
  $('copy-prompt').addEventListener('click',()=>{const text=$('prompt-output').value;if(!text){$('prompt-status').textContent=t('promptEmpty');return;}copy(text,$('prompt-output'),$('prompt-status'));});
  $('manual-prompt').addEventListener('click',()=>{if(!$('prompt-output').value){$('prompt-status').textContent=t('promptEmpty');return;}selectField($('prompt-output'),$('prompt-status'));});
  $('check').addEventListener('click',()=>{
    const text=$('draft').value,report=ListeningDraftCheck.analyze(text);$('issues').replaceChildren();lastReview=text;
    if(report.error){$('check-status').textContent=t(report.error);return;}
    $('check-status').textContent=report.issues.length?report.issues.length+' '+t('found'):t('clean');
    for(const issue of report.issues.slice(0,80)){
      const li=document.createElement('li'),label=document.createElement('span'),button=document.createElement('button');
      label.textContent=(lang==='zh'?'第'+issue.line+'行':t('line')+' '+issue.line)+' · '+t('types')[issue.type];
      button.type='button';button.className='secondary';button.textContent=t('find');
      button.addEventListener('click',()=>{if($('draft').value!==lastReview){$('check-status').textContent=t('changed');return;}$('draft').focus();$('draft').setSelectionRange(issue.start,issue.end);});
      li.append(label,button);$('issues').append(li);
    }
    if(report.issues.length>80){const li=document.createElement('li');li.textContent=t('more');$('issues').append(li);}
  });
  $('draft').addEventListener('input',()=>{if(lastReview&&$('draft').value!==lastReview){$('check-status').textContent=t('changed');$('issues').replaceChildren();}});
  ['title','body'].forEach(id=>$(id).addEventListener('input',()=>{$('fallback').hidden=true;$('manual-text').value='';$('export-status').textContent='';}));
  $('transfer').addEventListener('click',()=>{
    const text=$('draft').value;
    if(!text.trim()){$('check-status').textContent=t('empty');return;}
    if($('body').value&&$('body').value!==text){$('check-status').textContent=t('transferBlocked');return;}
    $('body').value=text;$('check-status').textContent=t('transferReady');
  });
  $('copy-script').addEventListener('click',()=>{const text=script();if(text!==null)copy(text,null,$('export-status'));});
  $('manual-script').addEventListener('click',()=>{const text=script();if(text===null)return;$('fallback').hidden=false;$('manual-text').value=text;selectField($('manual-text'),$('export-status'));});
  $('download-script').addEventListener('click',()=>{const text=script();if(text!==null)download(text,'listening-script.txt');});
  $('download-references').addEventListener('click',()=>{const text=$('references').value;if(!text.trim()){$('export-status').textContent=t('referencesEmpty');return;}download(text.replace(/\r\n?/g,'\n'),'reference-notes.txt');});
  setLanguage(document.documentElement.lang.startsWith('zh')?'zh':'en');
})();
