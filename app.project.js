
const state={activeTab:"canvas",query:"",selectedId:null,sharedProjectId:null,folderCounter:1,assetCounter:1,canvasSelection:["hero"],agentRefs:[],expandedByTab:{canvas:new Set(["canvas-group","canvas-raw"]),mine:new Set(["mine-role","mine-role-game","mine-monster","mine-monster-game","mine-pet","mine-pet-game","mine-scene","mine-scene-game","mine-prop","mine-prop-game","mine-ui","mine-ui-game","mine-film","mine-film-game","mine-film-project","mine-talent","mine-talent-common","mine-copy","mine-copy-game","mine-audio","mine-audio-common","mine-brand","mine-brand-game","mine-process","mine-process-game","mine-other","mine-other-common"]),shared:new Set(["shared-p1-role","shared-p1-monster","shared-p1-pet","shared-p1-scene","shared-p1-prop","shared-p1-ui","shared-p1-brand","shared-p1-other","shared-p2-role","shared-p2-monster","shared-p2-pet","shared-p2-scene","shared-p2-prop","shared-p2-ui","shared-p2-brand","shared-p2-other","shared-p3-role","shared-p3-monster","shared-p3-pet","shared-p3-scene","shared-p3-prop","shared-p3-ui","shared-p3-brand","shared-p3-other"])}};
const copy={canvas:{subtitle:"当前画布资源导航，节点可直接拖拽移动",placeholder:"搜索当前画布节点"},mine:{subtitle:"gameplay 视频制作素材分类",placeholder:"搜索我的资源"},shared:{subtitle:"团队",placeholder:"搜索团队资源"}};
function folder(id,name,meta={},children=[]){return{id,name,type:"folder",meta,children,tags:[]}}
function item(id,name,assetType,badge,description,path,permission){return{id,name,type:"asset",assetType,badge,description,path,permission,tags:buildDefaultTags(name,assetType,path)}}
function buildDefaultTags(name,type,path=""){const tags=[assetTypeLabel(type)];`${name} ${path}`.split(/[\s_\-/]+/).forEach(p=>{p=p.trim();if(p&&p.length<=12&&!tags.includes(p))tags.push(p)});return tags.slice(0,5)}
function assetTypeLabel(t){return{image:"图片",video:"视频",text:"文本",audio:"音频"}[t]||"资源"}
function hashString(v){let h=0;for(const ch of String(v||""))h=(Math.imul(31,h)+ch.charCodeAt(0))>>>0;return h}
function svgEscape(v){return String(v??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function makePreviewThumbnailDataUri(n){const seed=hashString(`${n.name}|${n.path}|${n.assetType}`),h1=seed%360,h2=(h1+36)%360,h3=(h1+118)%360,title=svgEscape(n.name.length>14?n.name.slice(0,14)+"…":n.name),label=svgEscape(assetTypeLabel(n.assetType)),isVideo=n.assetType==="video";const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="${label} ${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${h1} 38% 20%)"/>
      <stop offset="56%" stop-color="hsl(${h2} 46% 46%)"/>
      <stop offset="100%" stop-color="hsl(${h3} 58% 64%)"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.24)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.02)"/>
    </linearGradient>
  </defs>
  <rect width="640" height="360" rx="28" fill="url(#bg)"/>
  <circle cx="${120+(seed%160)}" cy="${80+((seed>>4)%70)}" r="${36+((seed>>8)%18)}" fill="rgba(255,240,188,0.92)"/>
  <path d="M0 260 C110 208 168 232 260 186 C338 148 404 170 488 142 C548 122 590 126 640 108 L640 360 L0 360 Z" fill="rgba(255,255,255,0.18)"/>
  <path d="M0 278 C102 226 175 250 256 206 C326 168 412 182 520 152 C572 138 612 136 640 128 L640 360 L0 360 Z" fill="rgba(18,27,43,0.18)"/>
  <rect x="28" y="28" width="584" height="304" rx="22" fill="url(#glass)" opacity="0.55"/>
  ${isVideo ? `
  <rect x="470" y="32" width="112" height="34" rx="17" fill="rgba(255,255,255,0.2)"/>
  <text x="526" y="55" fill="#fff" text-anchor="middle" font-size="18" font-family="Arial, 'PingFang SC', sans-serif" font-weight="700">${label}</text>
  <circle cx="312" cy="180" r="58" fill="rgba(255,255,255,0.24)"/>
  <polygon points="294,152 294,208 344,180" fill="#fff"/>
  <rect x="84" y="286" width="472" height="10" rx="5" fill="rgba(255,255,255,0.25)"/>
  <rect x="84" y="286" width="${120 + (seed % 200)}" height="10" rx="5" fill="rgba(255,255,255,0.85)"/>
  <rect x="84" y="304" width="160" height="10" rx="5" fill="rgba(255,255,255,0.16)"/>
  ` : `
  <rect x="58" y="42" width="136" height="36" rx="18" fill="rgba(255,255,255,0.2)"/>
  <text x="126" y="65" fill="#fff" text-anchor="middle" font-size="18" font-family="Arial, 'PingFang SC', sans-serif" font-weight="700">${label}</text>
  <rect x="70" y="108" width="500" height="174" rx="20" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.18)"/>
  <path d="M94 244 L183 176 L248 228 L316 158 L414 240 L536 144" fill="none" stroke="rgba(255,255,255,0.74)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="214" cy="162" r="30" fill="rgba(255,245,214,0.92)"/>
  <rect x="74" y="292" width="258" height="12" rx="6" fill="rgba(255,255,255,0.32)"/>
  `}
  <text x="42" y="332" fill="rgba(255,255,255,0.9)" font-size="24" font-family="Arial, 'PingFang SC', sans-serif" font-weight="700">${title}</text>
</svg>`;return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`}
function previewMediaMarkup(n){if(n.assetType==="image"||n.assetType==="video")return `<div class="preview-media preview-media-${n.assetType}"><img class="preview-media-img" src="${makePreviewThumbnailDataUri(n)}" alt="${esc(n.name)}" /></div>`;if(n.assetType==="text")return `<div class="preview-media preview-media-text"><span class="preview-media-symbol">文</span><span class="preview-media-caption">文案</span></div>`;if(n.assetType==="audio")return `<div class="preview-media preview-media-audio"><span class="preview-media-symbol">音</span><span class="preview-media-caption">音频</span></div>`;return `<div class="preview-media preview-media-generic"><span class="preview-media-symbol">资</span></div>`}
function sharedDefaults(prefix,itemsByCategory={}){const cats=[["role","角色"],["monster","怪物/Boss"],["pet","宠物/坐骑"],["scene","场景/地图"],["prop","道具/武器"],["ui","UI"],["film","成片素材集合"],["talent","达人素材"],["brand","品牌/渠道"],["other","其他"]];return cats.map(([key,name])=>folder(`${prefix}-${key}`,name,{fixed:true},itemsByCategory[key]||[]))}
const trees={
  canvas:[
    item("hero","萧峰_立绘","image","图片节点","角色立绘，来自当前画布","萧峰_立绘"),
    folder("canvas-group","成片素材集合_高福利开局",{group:true},[
      item("hook","高福利开局_A段钩子","video","视频节点","15s 竖版 A 段","成片素材集合_高福利开局"),
      item("copy","口播文案_v2","text","文本节点","开局送满级福利","成片素材集合_高福利开局"),
      item("voice","配音_热血男声","audio","音频节点","12s 配音","成片素材集合_高福利开局")
    ]),
    folder("canvas-raw","临时草稿组_不收纳",{group:true},[
      item("draft-1","参考图_风格探索","image","图片节点","草稿内容，可只留在画布","临时草稿组_不收纳")
    ])
  ],
  mine:[
    folder("mine-role","角色",{fixed:true},[
      folder("mine-role-game","天龙八部2",{},[
        item("mine-role-1","萧峰_立绘_白底.png","image","图片","个人副本","角色 / 天龙八部2")
      ]),
      folder("mine-role-common","通用",{},[])
    ]),
    folder("mine-monster","怪物/Boss",{fixed:true},[
      folder("mine-monster-game","天龙八部2",{},[
        item("mine-monster-1","黑龙Boss_立绘.png","image","图片","爽点击杀素材","怪物/Boss / 天龙八部2")
      ])
    ]),
    folder("mine-pet","宠物/坐骑",{fixed:true},[
      folder("mine-pet-game","天龙八部2",{},[
        item("mine-pet-1","青龙坐骑_三视图.png","image","图片","辅助主体素材","宠物/坐骑 / 天龙八部2")
      ])
    ]),
    folder("mine-scene","场景/地图",{fixed:true},[
      folder("mine-scene-game","天龙八部2",{},[
        item("mine-scene-1","洛阳城_战斗场景.png","image","图片","常用背景素材","场景/地图 / 天龙八部2")
      ])
    ]),
    folder("mine-prop","道具",{fixed:true},[
      folder("mine-prop-game","天龙八部2",{},[
        item("mine-prop-1","屠龙刀_武器图标.png","image","图片","武器、装备、礼包、货币等游戏物件","道具 / 天龙八部2")
      ])
    ]),
    folder("mine-ui","UI",{fixed:true},[
      folder("mine-ui-game","天龙八部2",{},[
        item("mine-ui-1","活动入口_按钮.png","image","图片","游戏内按钮、弹窗、图标等界面素材","UI / 天龙八部2")
      ])
    ]),
    folder("mine-film","成片素材集合",{fixed:true},[
      folder("mine-film-game","天龙八部2",{},[
        folder("mine-film-project","高福利开局_竖版_20260803",{},[
          item("mine-film-final","最终成片.mp4","video","视频","成片版本 v2","成片素材集合 / 天龙八部2 / 高福利开局"),
          item("mine-film-hook","A段钩子.mp4","video","视频","可替换开头钩子","成片素材集合 / 天龙八部2 / 高福利开局"),
          item("mine-film-script","口播文案.txt","text","文本","BPM 提交前整理","成片素材集合 / 天龙八部2 / 高福利开局"),
          item("mine-film-voice","配音.mp3","audio","音频","男声版本","成片素材集合 / 天龙八部2 / 高福利开局")
        ])
      ])
    ]),
    folder("mine-talent","达人素材",{fixed:true},[
      folder("mine-talent-common","通用",{},[
        item("mine-talent-1","达人口播_热血版.mp4","video","视频","主播、达人、真人演员、代言人等真人素材","达人素材 / 通用")
      ])
    ]),
    folder("mine-copy","文案/字幕",{fixed:true},[
      folder("mine-copy-game","天龙八部2",{},[
        item("mine-copy-1","高福利卖点_字幕.txt","text","文本","标题、卖点、口播稿、字幕文本","文案/字幕 / 天龙八部2")
      ])
    ]),
    folder("mine-audio","音频素材",{fixed:true},[
      folder("mine-audio-common","通用",{},[
        item("mine-audio-1","热血BGM_15s.mp3","audio","音频","BGM、音效、配音、旁白","音频素材 / 通用")
      ])
    ]),
    folder("mine-brand","品牌/KV/渠道",{fixed:true},[
      folder("mine-brand-game","天龙八部2",{},[
        item("mine-brand-1","TapTap渠道KV_竖版.png","image","图片","渠道 KV、Logo、落版、品牌规范","品牌/KV/渠道 / 天龙八部2")
      ])
    ]),
    folder("mine-process","过程文件",{fixed:true},[
      folder("mine-process-game","天龙八部2",{},[])
    ]),
    folder("mine-other","其他",{fixed:true},[
      folder("mine-other-common","通用",{},[
        item("mine-other-1","临时参考图.png","image","图片","无法归类的临时素材","其他 / 通用")
      ])
    ])
  ],
  shared:[
    folder("shared-project-1","天龙八部2",{project:true,permission:"manage",members:8,owner:"李雷",desc:"买量视频与渠道素材统一沉淀"},sharedDefaults("shared-p1",{role:[item("shared-role-1","萧峰_三视图.png","image","图片","团队资源","天龙八部2 / 角色","manage"),item("shared-role-2","男弓箭_立绘.png","image","图片","团队资源","天龙八部2 / 角色","manage")],ui:[item("shared-ui-1","登录页_按钮.png","image","图片","团队资源","天龙八部2 / UI","read")],brand:[item("shared-logo","logo-透明底.png","image","图片","团队资源","天龙八部2 / 品牌/KV/渠道","edit")],other:[item("shared-other-1","团队说明.txt","text","文本","团队文档","天龙八部2 / 其他","manage")]})),
    folder("shared-project-2","热血江湖",{project:true,permission:"edit",members:5,owner:"王敏",desc:"直播切片、投放封面和常用角色素材"},sharedDefaults("shared-p2",{role:[item("shared-role-3","门派主角_立绘.png","image","图片","团队资源","热血江湖 / 角色","edit")],ui:[item("shared-ui-2","登录页_按钮.png","image","图片","团队资源","热血江湖 / UI","edit")],brand:[item("shared-brand-2","直播封面.png","image","图片","团队资源","热血江湖 / 品牌/KV/渠道","edit")],other:[item("shared-other-2","素材清单.txt","text","文本","团队文档","热血江湖 / 其他","edit")]})),
    folder("shared-project-3","斗罗大陆",{project:true,permission:"read",members:12,owner:"赵强",desc:"渠道投放成品与品牌规范，只开放浏览复用"},sharedDefaults("shared-p3",{role:[item("shared-role-4","唐三_立绘.png","image","图片","团队资源","斗罗大陆 / 角色","read")],brand:[item("shared-kv-1","应用宝渠道KV.png","image","图片","团队资源","斗罗大陆 / 品牌/KV/渠道","read")],other:[item("shared-copy-1","渠道卖点文案.txt","text","文本","团队文档","斗罗大陆 / 其他","read")]}))
  ]
};
const $=s=>document.querySelector(s),appShell=$(".app-shell"),tabs=document.querySelectorAll(".tab"),railTabs=document.querySelectorAll(".panel-rail-tab"),searchInput=$("#searchInput"),treeArea=$("#treeArea"),sharedProjectHeader=$("#sharedProjectHeader"),panelSubtitle=$("#panelSubtitle"),panelRailCount=$("#panelRailCount"),panelToggle=$("#panelToggle"),rootCreateButton=$("#rootCreateButton"),collapseAllButton=$("#collapseAllButton"),previewCard=$("#previewCard"),contextMenu=$("#contextMenu"),modalLayer=$("#modalLayer"),modalCard=$("#modalCard"),toastLog=$("#toastLog"),agentCount=$("#agentCount"),agentEmpty=$("#agentEmpty"),agentList=$("#agentList"),canvasSelectionLabel=$("#canvasSelectionLabel"),canvasBoard=$("#canvasBoard");let previewTimer=null,canvasDrag=null,canvasSelect=null;document.addEventListener("pointermove",e=>{if(canvasDrag){const el=canvasDrag.el,dx=e.clientX-canvasDrag.startX,dy=e.clientY-canvasDrag.startY;if(Math.abs(dx)+Math.abs(dy)>4)canvasDrag.moved=true;const maxLeft=canvasBoard.clientWidth-el.offsetWidth-8,maxTop=canvasBoard.clientHeight-el.offsetHeight-8,left=Math.max(8,Math.min(maxLeft,canvasDrag.left+dx)),top=Math.max(8,Math.min(maxTop,canvasDrag.top+dy));el.style.left=`${left}px`;el.style.top=`${top}px`}if(canvasSelect){const x1=Math.min(canvasSelect.startX,e.clientX),y1=Math.min(canvasSelect.startY,e.clientY),x2=Math.max(canvasSelect.startX,e.clientX),y2=Math.max(canvasSelect.startY,e.clientY);canvasSelect.box.style.left=`${x1-canvasSelect.rect.left}px`;canvasSelect.box.style.top=`${y1-canvasSelect.rect.top}px`;canvasSelect.box.style.width=`${x2-x1}px`;canvasSelect.box.style.height=`${y2-y1}px`;canvasSelect.bounds={left:x1,top:y1,right:x2,bottom:y2};canvasSelect.moved=Math.abs(x2-x1)+Math.abs(y2-y1)>4}});document.addEventListener("pointerup",()=>{if(canvasDrag){const el=canvasDrag.el;el.classList.remove("dragging");if(canvasDrag.moved){el.dataset.skipClick="1";setTimeout(()=>delete el.dataset.skipClick,0)}canvasDrag=null}if(canvasSelect){const {box,moved,bounds}=canvasSelect;if(box&&box.parentNode)box.remove();if(moved&&bounds){const selected=[];document.querySelectorAll(".canvas-node,.canvas-group").forEach(el=>{const r=el.getBoundingClientRect();if(!(r.right<bounds.left||r.left>bounds.right||r.bottom<bounds.top||r.top>bounds.bottom))selected.push(el.dataset.nodeId==="group"?"canvas-group":el.dataset.nodeId)});state.canvasSelection=[...new Set(selected)];document.querySelectorAll(".canvas-node,.canvas-group").forEach(x=>x.classList.toggle("selected",state.canvasSelection.includes(x.dataset.nodeId==="group"?"canvas-group":x.dataset.nodeId)));updateCanvasSelectionView()}else if(!moved){state.canvasSelection=[];document.querySelectorAll(".canvas-node,.canvas-group").forEach(x=>x.classList.remove("selected"));updateCanvasSelectionView()}canvasSelect=null}});
function esc(v){return String(v??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function getExpanded(){return state.expandedByTab[state.activeTab]}
function findNode(nodes,id,parent=null){for(const n of nodes){if(n.id===id)return{node:n,parent};if(n.children){const f=findNode(n.children,id,n);if(f)return f}}return null}
function getActiveSharedProject(){return state.sharedProjectId?findNode(trees.shared,state.sharedProjectId)?.node:null}
function activeTree(){return state.activeTab==="shared"&&getActiveSharedProject()?getActiveSharedProject().children:trees[state.activeTab]}
function matchesQuery(n,q){q=q.trim().toLowerCase();if(!q)return true;const nq=q.replace(/[\s·，。、/_-]+/g,"");return[n.name,n.path,n.badge,n.description,assetTypeLabel(n.assetType),...(n.tags||[])].some(f=>{const text=String(f||"").toLowerCase();return text.includes(q)||(!nq?false:text.replace(/[\s·，。、/_-]+/g,"").includes(nq))})}
function filterNodes(nodes,q){return nodes.map(n=>{const children=n.children?filterNodes(n.children,q):[],ok=matchesQuery(n,q);if(n.children)return ok||children.length?{...n,children}:null;return ok?n:null}).filter(Boolean)}
function countAssets(n){return(n.children||[]).reduce((s,c)=>s+(c.type==="asset"?1:0)+countAssets(c),0)}
function countMatchingAssets(n,q){return(n.children||[]).reduce((s,c)=>s+(matchesQuery(c,q)?1:0)+countMatchingAssets(c,q),0)}
function countTreeEntries(nodes){return(nodes||[]).reduce((s,n)=>s+1+countTreeEntries(n.children||[]),0)}
function permissionText(p){return p==="manage"?"可管理":p==="edit"?"可编辑":"可阅读"}
function permissionDescription(p){return p==="manage"?"可整理资源、调整分类、管理成员":p==="edit"?"可整理资源，不可管理成员":"可浏览、复制到我的、复制到画布"}
function tabName(t){return{canvas:"画布",mine:"我的",shared:"团队"}[t]}
function railCountText(){const p=getActiveSharedProject();if(state.activeTab==="shared"&&!p)return `${trees.shared.length} 个团队`;if(state.activeTab==="shared"&&p)return `${countAssets(p)} 个资源`;return `${countTreeEntries(activeTree())} 项`}
function canManageSharedFolder(n){return state.activeTab==="shared"&&n.type==="folder"&&!n.meta?.project&&getSharedPermission(n)==="manage"}
function log(m){toastLog.textContent=m}
function render(){document.querySelectorAll(".tab,.panel-rail-tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===state.activeTab));const p=getActiveSharedProject();sharedProjectHeader.innerHTML="";sharedProjectHeader.classList.toggle("hidden",!(state.activeTab==="shared"&&p));if(state.activeTab==="shared"&&p)sharedProjectHeader.appendChild(renderSharedHeader(p));panelSubtitle.textContent=p?`${p.name} 团队文件夹`:copy[state.activeTab].subtitle;panelRailCount.textContent=railCountText();searchInput.placeholder=p?"搜索团队文件夹或资源":copy[state.activeTab].placeholder;updateRootCreateButton();updateCollapseAllButton();renderTree();renderAgentRefs();renderCanvasBoard();updateCanvasSelectionView()}
function renderTree(){treeArea.innerHTML="";if(state.activeTab==="shared"&&!state.sharedProjectId){const projects=trees.shared.filter(p=>!state.query.trim()||matchesQuery(p,state.query)||countMatchingAssets(p,state.query)>0);if(!projects.length){treeArea.innerHTML='<div class="empty-state">没有找到匹配团队</div>';return}projects.forEach(p=>treeArea.appendChild(renderSharedCard(p)));return}const nodes=filterNodes(activeTree(),state.query);if(!nodes.length)treeArea.insertAdjacentHTML("beforeend",'<div class="empty-state">没有找到匹配资源</div>');else renderNodeList(nodes,treeArea,0)}
function updateRootCreateButton(){const scope=getRootFolderScope();rootCreateButton.classList.toggle("hidden",!scope);const title=scope?.type==="project-list"?"新建团队":scope?`在${scope.label}中新建一级文件夹`:"新建一级文件夹";rootCreateButton.title=title;rootCreateButton.setAttribute("aria-label",title)}
function updateCollapseAllButton(){collapseAllButton.classList.toggle("hidden",state.activeTab==="shared"&&!state.sharedProjectId)}
function renderNodeList(nodes,root,depth){const forceOpen=state.query.trim();nodes.forEach(n=>{const expanded=n.children&&(forceOpen||getExpanded().has(n.id));const row=document.createElement("div");row.className="tree-row";row.dataset.nodeId=n.id;row.dataset.nodeType=n.type;row.dataset.asset=n.type==="asset"?n.assetType:"folder";row.style.paddingLeft=`${8+depth*16}px`;row.classList.toggle("selected",state.selectedId===n.id);row.innerHTML=`<span class="twisty">${n.children?(expanded?"▾":"▸"):""}</span><span class="icon">${iconFor(n)}</span><span class="tree-name">${esc(n.name)}</span>`;row.onclick=()=>{state.selectedId=n.id;if(n.children){getExpanded().has(n.id)?getExpanded().delete(n.id):getExpanded().add(n.id);renderTree();return}hideLayers(false);showPreview(row,n);renderTree()};row.oncontextmenu=e=>showContextMenu(e,n);root.appendChild(row);if(n.children&&expanded)renderNodeList(n.children,root,depth+1)})}
function iconFor(n){if(n.type==="folder")return n.meta?.project?"▣":n.meta?.group?"▥":"▰";if(n.assetType==="image"||n.assetType==="video")return `<img class="node-thumb" src="${makePreviewThumbnailDataUri(n)}" alt="" aria-hidden="true" />`;return{image:"图",video:"视",text:"文",audio:"音"}[n.assetType]||"资"}
function renderSharedCard(p){const perm=p.meta.permission,card=document.createElement("article");card.className="shared-project-card compact";card.classList.toggle("selected",state.selectedId===p.id);card.innerHTML=`<div class="shared-project-mark ${perm}">${esc(p.name.slice(0,1))}</div><div class="shared-project-info"><div class="shared-card-name">${esc(p.name)}</div><div class="shared-project-desc">${esc(p.meta.desc||"暂无团队介绍")}</div></div><span class="shared-permission ${perm}">${permissionText(perm)}</span><span class="shared-enter-mark">›</span>`;card.onclick=()=>{state.sharedProjectId=p.id;state.selectedId=p.id;state.query="";searchInput.value="";hideLayers();render()};card.oncontextmenu=e=>showContextMenu(e,p);return card}
function renderSharedHeader(p){const perm=p.meta.permission,canManage=perm==="manage",h=document.createElement("div");h.className="shared-library-header";h.innerHTML=`<button class="shared-back" type="button" aria-label="返回团队列表">‹</button><div class="shared-library-title"><div class="shared-library-title-row"><div class="shared-library-name">${esc(p.name)}</div><span class="shared-permission ${perm}">${permissionText(perm)}</span></div><div class="shared-library-desc">${esc(p.meta.desc||"暂无团队介绍")}</div></div>${canManage?'<div class="shared-library-actions"><button class="shared-card-action primary" data-project-share type="button">分享</button><button class="shared-card-action quiet" data-project-settings type="button">管理</button></div>':""}`;h.querySelector(".shared-back").onclick=()=>{state.sharedProjectId=null;state.selectedId=null;state.query="";searchInput.value="";hideLayers();render()};const shareButton=h.querySelector("[data-project-share]");if(shareButton)shareButton.onclick=()=>openProjectShareModal(p);const settingsButton=h.querySelector("[data-project-settings]");if(settingsButton)settingsButton.onclick=()=>openProjectSettingsModal(p);return h}
function renderTags(n){return(n.tags||[]).length?`<div class="preview-tags">${n.tags.map(t=>`<span class="tag-chip">${esc(t)}</span>`).join("")}</div>`:'<div class="preview-tags empty">暂无标签</div>'}
function showPreview(anchor,n){const isCanvas=state.activeTab==="canvas";previewCard.innerHTML=`${previewMediaMarkup(n)}<div class="preview-title">${esc(n.name)}</div>${renderTags(n)}<div class="preview-actions"><button class="preview-main" type="button">${isCanvas?"定位到节点":"复制到画布"}</button><button class="preview-secondary" type="button">引用到 Agent</button></div>`;previewCard.dataset.previewId=n.id;previewCard.dataset.previewTab=state.activeTab;const r=anchor.getBoundingClientRect();previewCard.style.left=`${Math.min(r.right+10,window.innerWidth-330)}px`;previewCard.style.top=`${Math.max(12,Math.min(r.top-8,window.innerHeight-300))}px`;previewCard.classList.remove("hidden");previewCard.querySelector(".preview-main").onclick=()=>isCanvas?locateNode(n.id):sendToCanvas(n);previewCard.querySelector(".preview-secondary").onclick=()=>quoteToAgent(n)}
document.addEventListener("click",e=>{if(previewCard.classList.contains("hidden"))return;const row=e.target.closest?.(".tree-row");if(previewCard.contains(e.target))return;if(row&&row.dataset.nodeType==="asset")return;previewCard.classList.add("hidden")})
previewCard.oncontextmenu=e=>{const sourceTab=previewCard.dataset.previewTab||state.activeTab,tree=sourceTab==="canvas"?trees.canvas:sourceTab==="shared"&&state.sharedProjectId?[getActiveSharedProject()]:trees[sourceTab],n=findNode(tree||[],previewCard.dataset.previewId)?.node;if(!n||n.type!=="asset")return;showPreviewContextMenu(e,n,sourceTab)}
function showContextMenu(e,n,sourceTab=state.activeTab){e.preventDefault();hideLayers(false);state.selectedId=n.id;const items=buildMenuItems(n,sourceTab);contextMenu.innerHTML=items.map((it,i)=>`<button class="menu-item${it.danger?" danger":""}" data-index="${i}" type="button" ${it.disabled?"disabled":""}>${esc(it.label)}</button>`).join("");contextMenu.querySelectorAll(".menu-item").forEach(b=>b.onclick=()=>{const it=items[Number(b.dataset.index)];if(!it.disabled)it.handler();contextMenu.classList.add("hidden")});contextMenu.style.left=`${Math.min(e.clientX,window.innerWidth-180)}px`;contextMenu.style.top=`${Math.min(e.clientY,window.innerHeight-260)}px`;contextMenu.classList.remove("hidden");renderTree()}
function showPreviewContextMenu(e,n,sourceTab){e.preventDefault();hideLayers(false);state.selectedId=n.id;const items=sourceTab==="canvas"?[{label:"下载",handler:()=>downloadAsset(n)},{label:"定位到节点",handler:()=>locateNode(n.id)},{label:"引用到 Agent",handler:()=>quoteToAgent(n)}]:buildMenuItems(n,sourceTab);contextMenu.innerHTML=items.map((it,i)=>`<button class="menu-item${it.danger?" danger":""}" data-index="${i}" type="button" ${it.disabled?"disabled":""}>${esc(it.label)}</button>`).join("");contextMenu.querySelectorAll(".menu-item").forEach(b=>b.onclick=()=>{const it=items[Number(b.dataset.index)];if(!it.disabled)it.handler();contextMenu.classList.add("hidden")});contextMenu.style.left=`${Math.min(e.clientX,window.innerWidth-180)}px`;contextMenu.style.top=`${Math.min(e.clientY,window.innerHeight-180)}px`;contextMenu.classList.remove("hidden");renderTree()}
function buildMenuItems(n,sourceTab=state.activeTab){
  const isFolder=n.type==="folder";
  if(sourceTab==="canvas"){
    const canvasBatch=state.canvasSelection.length>1&&state.canvasSelection.includes(n.id)?getCanvasSelectionForSave():[n];
    return [
      {label:"引用到 Agent",handler:()=>quoteToAgent(n)},
      {label:"编辑标签",handler:()=>openTagModal(n),disabled:false},
      {label:"创建副本",handler:()=>createCanvasDuplicate(n)},
      {label:"复制到我的",handler:()=>openAddToMineModal(canvasBatch,"复制到我的")},
      {label:"复制到团队",handler:()=>openSharedModal(canvasBatch,"复制到团队")},
      {label:"重命名",handler:()=>openRenameModal(n)},
      {label:"删除",handler:()=>openDeleteModal(n,"canvas"),danger:true}
    ];
  }
  const perm=getSharedPermission(n),canEdit=sourceTab!=="shared"||perm==="edit"||perm==="manage",canManage=sourceTab!=="shared"||perm==="manage",sharedManagedFolder=sourceTab==="shared"&&isFolder&&!n.meta?.project&&perm==="manage",items=[];
  if(sourceTab==="mine"&&isFolder){
    items.push({label:"新建文件夹",handler:()=>openNewFolderModal(n)});
    items.push({label:"移动",handler:()=>openMoveModal(n)});
  }
  if(sourceTab==="mine"&&!isFolder)items.push({label:"移动",handler:()=>openMoveModal(n)});
  if(sourceTab==="shared"&&n.meta?.project){
    const projectItems=[{label:"查看团队权限",handler:()=>openProjectPermissionModal(n)}];
    if(n.meta.permission==="manage")projectItems.push(
      {label:"分享",handler:()=>openProjectShareModal(n)},
      {label:"编辑团队信息",handler:()=>openEditProjectModal(n)}
    );
    return projectItems;
  }
  if(sharedManagedFolder)items.push({label:"新建文件夹",handler:()=>openNewFolderModal(n)},{label:"移动",handler:()=>openMoveModal(n)});
  if(!isFolder)items.push({label:"引用到 Agent",handler:()=>quoteToAgent(n)},{label:"编辑标签",handler:()=>openTagModal(n)});
  items.push({label:"创建副本",handler:()=>duplicateLibraryNode(n),disabled:sourceTab==="shared"&&perm==="read"},{label:"复制到画布",handler:()=>isFolder?sendFolderToCanvas(n):sendToCanvas(n)});
  if(!isFolder)items.push({label:"下载",handler:()=>downloadAsset(n)});
  if(sourceTab==="mine"&&!isFolder)items.push({label:"复制到团队",handler:()=>openSharedModal([n],"复制到团队")});
  if(sourceTab==="shared"&&!isFolder)items.push({label:"复制到我的",handler:()=>openAddToMineModal([n],"复制到我的")});
  if(sourceTab==="shared"&&!isFolder&&(perm==="edit"||perm==="manage"))items.push({label:"移动",handler:()=>openMoveModal(n)});
  items.push({label:"重命名",handler:()=>openRenameModal(n),disabled:n.meta?.project||(isFolder?!canManage:!canEdit)},{label:"删除",handler:()=>openDeleteModal(n),danger:true,disabled:n.meta?.project||(isFolder?!canManage:!canEdit)});
  return items;
}
function getSharedPermission(n){if(state.activeTab!=="shared")return"manage";const p=getActiveSharedProject()||(n.meta?.project?n:null);if(p)return p.meta.permission;return trees.shared.find(project=>findNode([project],n.id))?.meta.permission||"read"}
function cloneNode(src,suffix="_副本"){const id=`copy-${state.assetCounter++}`;const n=src.type==="folder"?folder(id,`${src.name}${suffix}`,{...src.meta,fixed:false,project:false},(src.children||[]).map(c=>cloneNode(c,""))):item(id,`${src.name}${suffix}`,src.assetType,src.badge,src.description,src.path||src.name,src.permission);n.tags=[...(src.tags||[])];return n}
function duplicateLibraryNode(n){const r=findNode(activeTree(),n.id);if(!r||!r.parent)return log("当前对象不能创建副本。");const d=cloneNode(n);const i=r.parent.children.findIndex(c=>c.id===n.id);r.parent.children.splice(i+1,0,d);state.selectedId=d.id;renderTree();log(`已创建副本：${d.name}`)}
function copyProjectLink(project){if(project.meta.permission!=="manage")return log("只有可管理成员可以分享团队。");const url=`${location.origin}${location.pathname}?project=${encodeURIComponent(project.id)}`;navigator.clipboard?.writeText(url);log(`已复制团队链接：${project.name}`)}
function getProjectMembers(project){if(!project.meta.memberList){const names=["李雷","王敏","赵强","陈晨","刘洋","孙可","周宁","许安","吴越","郑雨","黄一"],roles=["manage","edit","read","read","edit","read","read","edit","read","read","read"],total=Math.max(project.meta.members||4,4);project.meta.memberList=Array.from({length:total},(_,i)=>({id:`member-${project.id}-${i+1}`,name:i===0?project.meta.owner||names[0]:names[i%names.length],role:i===0?"manage":roles[i%roles.length],joinedAt:i===0?"团队创建时":["2026-08-",String(2+i).padStart(2,"0")].join(""),lastActive:i===0?"刚刚":"今天",status:"正常",isOwner:i===0}))}return project.meta.memberList}
function openProjectPermissionModal(project){const members=getProjectMembers(project),manageCount=members.filter(m=>m.role==="manage").length;modalCard.classList.remove("share-modal","member-picker-modal");modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">团队权限</div><div class="modal-desc">${esc(project.name)} · 当前团队成员 ${members.length} 人</div></div><div class="modal-body"><div class="member-summary"><span>当前权限：${permissionText(project.meta.permission)}</span><span>${permissionDescription(project.meta.permission)}</span></div><div class="modal-tip">团队至少保留一名可管理成员，当前共有 ${manageCount} 名。</div></div><div class="modal-footer"><button class="modal-action" data-close type="button">关闭</button></div>`;openModal()}
function openProjectMembersModal(project){if(project.meta.permission!=="manage")return log("只有可管理成员可以管理团队成员。");const members=getProjectMembers(project),manageCount=members.filter(m=>m.role==="manage").length;modalCard.classList.remove("share-modal","member-picker-modal");modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">成员管理</div><div class="modal-desc">管理 ${esc(project.name)} 的成员、角色和访问状态。</div></div><div class="modal-body"><div class="member-summary"><span>共 ${members.length} 名成员</span><button class="text-button" data-add-member type="button">+ 添加成员</button></div><div class="member-list">${members.map(m=>`<div class="member-row" data-member-id="${esc(m.id)}"><div><div class="member-name">${esc(m.name)}${m.isOwner?"（团队创建人）":""}</div><div class="member-desc">加入时间：${esc(m.joinedAt)} · 最近操作：${esc(m.lastActive)} · ${esc(m.status)}</div></div><select class="member-role" data-member-role ${m.isOwner?"disabled":""}><option value="read" ${m.role==="read"?"selected":""}>可阅读</option><option value="edit" ${m.role==="edit"?"selected":""}>可编辑</option><option value="manage" ${m.role==="manage"?"selected":""}>可管理</option></select><button class="member-remove" data-remove-member type="button" ${m.isOwner||(m.role==="manage"&&manageCount<=1)?"disabled":""}>移除</button></div>`).join("")}</div></div><div class="modal-footer"><button class="modal-action" data-close type="button">关闭</button></div>`;openModal();modalCard.querySelector("[data-add-member]").onclick=()=>openMemberModal(project,{onSelected:name=>{const list=getProjectMembers(project);if(list.some(m=>m.name===name)){log("该成员已在团队中，无需重复添加。");return openProjectMembersModal(project)}list.push({id:`member-${project.id}-${state.assetCounter++}`,name,role:"read",joinedAt:"今天",lastActive:"刚刚",status:"正常",isOwner:false});project.meta.members=list.length;openProjectMembersModal(project);log(`已添加成员：${name}`)}});modalCard.querySelectorAll("[data-member-role]").forEach(select=>select.onchange=()=>{const row=select.closest("[data-member-id]"),member=getProjectMembers(project).find(m=>m.id===row.dataset.memberId);if(!member)return;if(member.role==="manage"&&select.value!=="manage"&&getProjectMembers(project).filter(m=>m.role==="manage").length<=1){log("该团队至少需要保留一名可管理成员。");return openProjectMembersModal(project)}member.role=select.value;openProjectMembersModal(project);log(`已更新成员权限：${member.name} · ${permissionText(member.role)}`)});modalCard.querySelectorAll("[data-remove-member]").forEach(button=>button.onclick=()=>{const row=button.closest("[data-member-id]"),member=getProjectMembers(project).find(m=>m.id===row.dataset.memberId);if(member)openRemoveMemberModal(project,member)});}
function openRemoveMemberModal(project,member){modalCard.classList.remove("share-modal","member-picker-modal");modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">移除成员</div><div class="modal-desc">确认移除「${esc(member.name)}」？移除后该成员将立即失去团队访问权限。</div></div><div class="modal-footer"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">确认移除</button></div>`;openModal();modalCard.querySelector("[data-confirm]").onclick=()=>{const list=getProjectMembers(project),index=list.findIndex(m=>m.id===member.id);if(index<0)return;list.splice(index,1);project.meta.members=list.length;closeModal();openProjectMembersModal(project);log(`已移除成员：${member.name}`)}}
function openProjectShareModal(project){
  if(project.meta.permission!=="manage")return log("只有可管理成员可以分享团队。");
  const linkOn=!!project.meta.linkShareEnabled,selected=project.meta.pendingInviteName;
  modalCard.classList.remove("member-picker-modal");
  modalCard.classList.add("share-modal");
  modalCard.innerHTML=`<div class="modal-header share-modal-header"><div><div class="modal-title">分享团队</div></div><button class="modal-close-icon" data-close type="button" aria-label="关闭">×</button></div><div class="modal-body share-modal-body"><section class="share-section"><div class="share-section-head"><div class="share-section-title">协作者</div><button class="text-button" data-member-list type="button">管理成员</button></div><div class="share-invite-row"><button class="share-picker${selected?" selected":""}" data-member-manage type="button">${esc(selected||"请选择部门/人员")}</button><select class="share-role-select" data-role-select><option value="read">可阅读</option><option value="edit">可编辑</option><option value="manage">可管理</option></select><button class="share-invite-button" data-share-invite type="button">邀请</button></div></section><section class="share-section"><div class="share-section-head"><div class="share-section-title">链接分享</div><div class="share-link-state" data-link-state>${linkOn?"已开启 · 企业内获得链接的人可阅读":"已关闭 · 链接无法访问"}</div></div><div class="share-link-box"><label class="share-switch"><input data-link-toggle type="checkbox" ${linkOn?"checked":""} /><span></span></label>${linkOn?'<button class="share-copy-button" data-copy-link type="button">复制链接</button>':""}</div></section></div>`;
  openModal();
  modalCard.querySelector("[data-member-list]").onclick=()=>openProjectMembersModal(project);
  modalCard.querySelector("[data-member-manage]").onclick=()=>openMemberModal(project,{returnToShare:true});
  const inviteButton=modalCard.querySelector("[data-share-invite]"),toggle=modalCard.querySelector("[data-link-toggle]"),roleSelect=modalCard.querySelector("[data-role-select]"),copyButton=modalCard.querySelector("[data-copy-link]");
  toggle.onchange=()=>{project.meta.linkShareEnabled=toggle.checked;openProjectShareModal(project);log(toggle.checked?`已开启链接分享：${project.name}`:`已关闭链接分享：${project.name}`)};
  inviteButton.onclick=()=>{if(!project.meta.pendingInviteName)return openMemberModal(project,{returnToShare:true});const list=getProjectMembers(project),name=project.meta.pendingInviteName;if(list.some(m=>m.name===name)){project.meta.pendingInviteName="";log("该成员已在团队中，无需重复添加。");return openProjectShareModal(project)}list.push({id:`member-${project.id}-${state.assetCounter++}`,name,role:roleSelect.value,joinedAt:"今天",lastActive:"刚刚",status:"正常",isOwner:false});project.meta.members=list.length;log(`已邀请：${name}，权限：${permissionText(roleSelect.value)}`);project.meta.pendingInviteName="";openProjectShareModal(project)};
  if(copyButton)copyButton.onclick=()=>copyProjectLink(project);
  modalCard.querySelector("[data-close]").onclick=()=>{modalCard.classList.remove("share-modal");closeModal()};
}
function openProjectSettingsModal(project){
  if(project.meta.permission!=="manage")return log("只有可管理成员可以编辑团队信息。");
  openEditProjectModal(project);
}
function openEditProjectModal(project){modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">编辑团队</div></div><div class="modal-body"><div class="form-field"><label for="editProjectNameInput">团队名称</label><input id="editProjectNameInput" type="text" value="${esc(project.name)}" autocomplete="off" /></div><div class="form-field"><label for="editProjectDescInput">团队说明</label><input id="editProjectDescInput" type="text" value="${esc(project.meta.desc||"")}" autocomplete="off" /></div></div><div class="modal-footer"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">保存</button></div>`;openModal();const nameInput=modalCard.querySelector("#editProjectNameInput"),descInput=modalCard.querySelector("#editProjectDescInput");modalCard.querySelector("[data-confirm]").onclick=()=>{const next=nameInput.value.trim();if(!next)return log("团队名称不能为空。");project.name=next;project.meta.desc=descInput.value.trim();closeModal();render();log(`已更新团队：${next}`)};nameInput.focus();nameInput.select()}
function openMemberModal(project,options={}){const orgs=["江西贪玩信息技术有限公司","高热","丸子","915","自游人","尤里卡","菲凡","团队外包协作组"];modalCard.classList.remove("share-modal");modalCard.classList.add("member-picker-modal");modalCard.innerHTML=`<div class="member-picker-head"><div><div class="modal-title">添加可选人员</div></div><button class="modal-close-icon" data-close type="button" aria-label="关闭">×</button></div><div class="member-picker-body"><section class="member-picker-pane"><div class="member-pane-title">请选择人员/部门</div><label class="member-search"><span>⌕</span><input type="search" placeholder="搜索用户、部门" /></label><button class="member-org-tab" type="button">组织架构</button><div class="member-org-home">⌂</div><label class="member-select-all"><span>全选</span><input type="checkbox" /></label><div class="member-org-list">${orgs.map((name,i)=>`<div class="member-org-row"><span class="member-org-icon">⌘</span><span class="member-org-name">${esc(name)}</span><button type="button">下级</button><input type="checkbox" ${i===0?"checked":""}/></div>`).join("")}</div></section><section class="member-picker-pane selected"><div class="member-pane-title">已选 <strong>1</strong> 个人员/部门 <button class="member-clear" type="button">清空</button></div><label class="member-search"><span>⌕</span><input type="search" placeholder="搜索用户、部门、职位或角色" /></label><div class="member-selected-empty"><div class="member-org-icon large">⌘</div><div><strong>江西贪玩信息技术有限公司</strong></div></div></section></div><div class="member-picker-foot"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">确定</button></div>`;openModal();const closePicker=()=>{modalCard.classList.remove("member-picker-modal");options.returnToShare?openProjectShareModal(project):closeModal()};modalCard.querySelector("[data-confirm]").onclick=()=>{modalCard.classList.remove("member-picker-modal");const selectedName="江西贪玩信息技术有限公司";if(options.returnToShare){project.meta.pendingInviteName=selectedName;openProjectShareModal(project);return}if(options.onSelected){options.onSelected(selectedName);return}project.meta.members=Math.max(project.meta.members||1,1)+1;closeModal();log(`已更新「${project.name}」团队成员。`)};modalCard.querySelectorAll("[data-close]").forEach(b=>b.onclick=closePicker)}
function createCanvasDuplicate(n){const d=cloneNode(n);d.id=`canvas-copy-${state.assetCounter++}`;trees.canvas.push(d);state.activeTab="canvas";state.selectedId=d.id;state.canvasSelection=[d.id];render();updateCanvasSelectionView();log(`已在画布创建副本：${d.name}`)}
function locateNode(id){const map={voice:"group","draft-1":"group","canvas-group":"group","canvas-raw":"group"},target=canvasBoard.querySelector(`[data-node-id="${map[id]||id}"]`);if(!target)return log("未找到可定位目标，节点可能已被删除。");document.querySelectorAll(".canvas-node,.canvas-group").forEach(el=>el.classList.remove("highlight","selected"));target.classList.add("selected");target.classList.add("highlight");state.canvasSelection=[target.dataset.nodeId==="group"?"canvas-group":target.dataset.nodeId];updateCanvasSelectionView();target.scrollIntoView({behavior:"smooth",block:"center"});log(`已定位到画布节点：${target.dataset.nodeId}`)}
function sendToCanvas(n){const d=cloneNode(n,"");d.id=`sent-${state.assetCounter++}`;trees.canvas.push(d);state.canvasSelection=[d.id];renderCanvasBoard();updateCanvasSelectionView();locateNode(d.id);log(`已复制到当前画布：${n.name}。复制后为独立副本。`)}
function sendFolderToCanvas(n){const d=cloneNode(n,"");d.id=`sent-group-${state.assetCounter++}`;trees.canvas.push(d);state.canvasSelection=[d.id];renderCanvasBoard();updateCanvasSelectionView();locateNode(d.id);log(`已复制到画布：${n.name}。系统按文件夹生成画布组副本。`)}
function safeDownloadName(name){return(name||"asset").replace(/[\\/:*?"<>|]/g,"_").slice(0,80)||"asset"}
function downloadAsset(n){const payload={name:n.name,type:n.assetType||n.type,path:n.path||n.name,tags:n.tags||[],description:n.description||"",downloadedAt:new Date().toISOString()};const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`${safeDownloadName(n.name)}.resource.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);log(`已开始下载：${n.name}`)}
function quoteToAgent(n){if(state.agentRefs.some(r=>r.id===n.id))return log(`Agent 已引用过：${n.name}`);state.agentRefs.push({id:n.id,name:n.name,source:tabName(state.activeTab),path:n.path||n.name,tags:n.tags||[],permission:state.activeTab==="shared"?permissionText(getSharedPermission(n)):""});renderAgentRefs();log(`已引用到 Agent：${n.name}`)}
function renderAgentRefs(){agentCount.textContent=state.agentRefs.length;agentEmpty.classList.toggle("hidden",state.agentRefs.length>0);agentList.innerHTML=state.agentRefs.map(r=>`<div class="agent-ref-item"><div class="agent-ref-name">${esc(r.name)}</div><div class="agent-ref-path">${esc(r.source)} / ${esc(r.path)}${r.permission?` · ${esc(r.permission)}`:""}</div><div class="agent-ref-tags">${esc((r.tags||[]).join("、"))}</div></div>`).join("")}
function openModal(){modalLayer.classList.remove("hidden");modalCard.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeModal)}function closeModal(){modalLayer.classList.add("hidden")}function hideLayers(includePreview=true){contextMenu.classList.add("hidden");if(includePreview)previewCard.classList.add("hidden")}
function openNewFolderModal(target,onCreated=()=>{}){modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">新建文件夹</div><div class="modal-desc">将在「${esc(target.name)}」下新建一个文件夹。</div></div><div class="modal-body"><div class="form-field"><label for="folderNameInput">文件夹名称</label><input id="folderNameInput" type="text" value="新建文件夹" autocomplete="off" /></div></div><div class="modal-footer"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">确认</button></div>`;openModal();const input=modalCard.querySelector("#folderNameInput");modalCard.querySelector("[data-confirm]").onclick=()=>{const name=input.value.trim()||"新建文件夹",nf=folder(`${state.activeTab}-folder-${state.folderCounter++}`,name,{},[]);target.children=target.children||[];target.children.push(nf);getExpanded().add(target.id);closeModal();renderTree();log(`已在「${target.name}」下新建文件夹：${name}`);onCreated(nf)};input.focus();input.select()}
function openRenameModal(n){modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">重命名</div><div class="modal-desc">修改「${esc(n.name)}」的名称。</div></div><div class="modal-body"><div class="form-field"><label for="renameInput">名称</label><input id="renameInput" type="text" value="${esc(n.name)}" autocomplete="off" /></div></div><div class="modal-footer"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">确认</button></div>`;openModal();const input=modalCard.querySelector("#renameInput");modalCard.querySelector("[data-confirm]").onclick=()=>{const next=input.value.trim();if(!next)return log("名称不能为空。");const old=n.name;n.name=next;closeModal();renderTree();log(`已重命名：${old} -> ${next}`)};input.focus();input.select()}
function openDeleteModal(n,sourceTab=state.activeTab){const affected=n.type==="folder"?countAssets(n):0;modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">删除确认</div><div class="modal-desc">确认删除「${esc(n.name)}」？${affected?`该文件夹内包含 ${affected} 个资源，删除后资源将不可见。`:"如果是文件夹，将同时删除其下所有内容。"}</div></div><div class="modal-footer"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">确认删除</button></div>`;openModal();modalCard.querySelector("[data-confirm]").onclick=()=>{const tree=sourceTab==="canvas"?trees.canvas:sourceTab==="shared"&&n.meta?.project?trees.shared:activeTree(),r=findNode(tree,n.id);if(r?.parent)r.parent.children=r.parent.children.filter(c=>c.id!==n.id);else{const idx=tree.findIndex(c=>c.id===n.id);if(idx>-1)tree.splice(idx,1)}if(n.meta?.project&&state.sharedProjectId===n.id)state.sharedProjectId=null;closeModal();state.selectedId=null;renderTree();log(`已删除：${n.name}`)}}
function containsNode(node,targetId){if(!node)return false;if(node.id===targetId)return true;return(node.children||[]).some(child=>containsNode(child,targetId))}function collectFolders(nodes,exclude=null,list=[]){nodes.forEach(n=>{if(n.type==="folder"&&n.id!==exclude&&!n.meta?.project){if(!exclude||!containsNode(n,exclude))list.push(n)}if(n.children)collectFolders(n.children,exclude,list)});return list}
function openMoveModal(n){const folders=collectFolders(activeTree(),n.id);if(!folders.length)return log("当前没有可移动到的目标文件夹。");modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">移动</div><div class="modal-desc">移动「${esc(n.name)}」到目标文件夹。</div></div><div class="modal-body"><div class="form-field"><label for="moveTargetSelect">目标文件夹</label><select id="moveTargetSelect">${folders.map(f=>`<option value="${f.id}">${esc(f.name)}</option>`).join("")}</select></div><div class="modal-tip">移动后立即更新当前目录结构。</div></div><div class="modal-footer"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">确认移动</button></div>`;openModal();modalCard.querySelector("[data-confirm]").onclick=()=>{const r=findNode(activeTree(),n.id),target=findNode(activeTree(),modalCard.querySelector("#moveTargetSelect").value)?.node;if(!r?.parent||!target)return log("移动失败，目标位置不存在。");r.parent.children=r.parent.children.filter(c=>c.id!==n.id);target.children=target.children||[];target.children.push(n);getExpanded().add(target.id);closeModal();renderTree();log(`已移动到：${target.name}`)}}
function openTagModal(n){modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">编辑标签</div><div class="modal-desc">为「${esc(n.name)}」补充检索和 Agent 调用标签。</div></div><div class="modal-body"><div class="form-field"><label for="tagInput">标签</label><input id="tagInput" type="text" value="${esc((n.tags||[]).join("，"))}" autocomplete="off" /></div><div class="modal-tip">多个标签可用空格、逗号或顿号分隔。标签用于搜索和 Agent 理解素材，不改变文件所在目录。</div></div><div class="modal-footer"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">保存</button></div>`;openModal();const input=modalCard.querySelector("#tagInput");modalCard.querySelector("[data-confirm]").onclick=()=>{n.tags=parseTags(input.value);closeModal();renderTree();log(`已更新标签：${n.name}`)};input.focus()}
function parseTags(v){const seen=new Set;return v.split(/[\s,，、]+/).map(t=>t.trim()).filter(Boolean).filter(t=>{if(seen.has(t))return false;seen.add(t);return true}).slice(0,12)}
function getCanvasSelectionForSave(){return state.canvasSelection.map(id=>findNode(trees.canvas,id)?.node).filter(Boolean)}
function getMineFolderPath(node){const parts=[];let current=node;while(current){parts.unshift(current.name);const parent=findNode(trees.mine,current.id)?.parent;current=parent}return parts.join(" / ")}
function getMineFolderTree(nodes=trees.mine,selectedId=null,depth=0){return nodes.filter(n=>n.type==="folder").map(n=>{const children=n.children?.filter(c=>c.type==="folder")||[];const selected=n.id===selectedId?" selected":"";return `<div class="folder-tree-node"><button class="folder-tree-row${selected}" type="button" data-folder-id="${n.id}" style="padding-left:${12+depth*18}px"><span class="folder-tree-icon">▸</span><span class="folder-tree-name">${esc(n.name)}</span></button>${children.length?`<div class="folder-tree-children">${getMineFolderTree(children,selectedId,depth+1)}</div>`:""}</div>`}).join("")}
function defaultSaveName(source){if(source.length===1)return source[0].name;return `批量保存_${source.length}个资源`}
function getRootFolderScope(){if(state.activeTab==="mine")return{type:"folder",label:"我的资源库",tree:trees.mine,permission:"manage"};if(state.activeTab==="shared"&&!state.sharedProjectId)return{type:"project-list",label:"团队列表"};if(state.activeTab==="shared"&&state.sharedProjectId){const project=getActiveSharedProject();if(!project)return null;const perm=project.meta.permission;if(perm==="manage")return{type:"folder",label:project.name,tree:project.children,permission:perm}}return null}
function openRootFolderModal(){const scope=getRootFolderScope();if(!scope)return log("当前范围不可创建。");if(scope.type==="project-list")return openCreateProjectModal();modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">新建一级文件夹</div><div class="modal-desc">将在「${esc(scope.label)}」根目录下新建一个一级文件夹。</div></div><div class="modal-body"><div class="form-field"><label for="rootFolderNameInput">文件夹名称</label><input id="rootFolderNameInput" type="text" value="新建文件夹" autocomplete="off" /></div></div><div class="modal-footer"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">确认</button></div>`;openModal();const input=modalCard.querySelector("#rootFolderNameInput");modalCard.querySelector("[data-confirm]").onclick=()=>{const name=input.value.trim()||"新建文件夹",nf=folder(`${state.activeTab}-folder-${state.folderCounter++}`,name,{},[]);scope.tree.push(nf);state.selectedId=nf.id;if(state.activeTab==="mine")state.expandedByTab.mine.add(nf.id);if(state.activeTab==="shared")state.expandedByTab.shared.add(nf.id);closeModal();renderTree();log(`已在「${scope.label}」根目录下新建一级文件夹：${name}`)};input.focus();input.select()}
function openCreateProjectModal(){modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">新建团队</div><div class="modal-desc">创建一个团队共享的资源库。</div></div><div class="modal-body"><div class="form-field"><label for="projectNameInput">团队名称</label><input id="projectNameInput" type="text" placeholder="请输入团队名称" autocomplete="off" /></div><div class="form-field"><label for="projectDescInput">团队说明</label><input id="projectDescInput" type="text" placeholder="选填" autocomplete="off" /></div></div><div class="modal-footer"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">确认新建</button></div>`;openModal();const nameInput=modalCard.querySelector("#projectNameInput"),descInput=modalCard.querySelector("#projectDescInput");modalCard.querySelector("[data-confirm]").onclick=()=>{const name=nameInput.value.trim();if(!name)return log("团队名称不能为空。");const prefix=`shared-new-${state.folderCounter++}`;const project=folder(`shared-project-${state.folderCounter++}`,name,{project:true,permission:"manage",members:1,owner:"我",desc:descInput.value.trim()||"团队资源"},sharedDefaults(prefix));trees.shared.unshift(project);state.activeTab="shared";state.sharedProjectId=project.id;state.selectedId=project.id;state.query="";searchInput.value="";closeModal();render();log(`已新建团队：${name}，默认分类已初始化。`)};nameInput.focus()}
function openAddToMineModal(source=getCanvasSelectionForSave(),title="复制到我的",initialTargetId=null){const defaultTags=parseTags(source.flatMap(s=>s.tags||[]).join("，"));const defaultTarget=initialTargetId||trees.mine.find(n=>n.type==="folder")?.id||null;modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">${esc(title)}</div><div class="modal-desc">将 ${source.length} 个内容复制为个人资产副本。</div></div><div class="modal-body"><div class="form-field"><label for="assetNameInput">资产名称</label><input id="assetNameInput" type="text" value="${esc(defaultSaveName(source))}" ${source.length>1?"disabled":""} autocomplete="off" /></div><div class="form-field"><div class="field-head"><label>目标位置</label><button class="text-button" id="createMineFolderButton" type="button">+ 新建文件夹</button></div><div class="folder-tree-picker" id="mineTargetTree">${getMineFolderTree(trees.mine,defaultTarget)}</div><div class="folder-tree-current" id="mineTargetLabel"></div></div><div class="form-field"><label for="saveTagInput">标签</label><input id="saveTagInput" type="text" value="${esc(defaultTags.join("，"))}" autocomplete="off" /></div><div class="modal-tip">目标位置直接在文件夹树中点选；树会保留父子层级。标签按当前规则填写，多个标签可用空格、逗号或顿号分隔。</div></div><div class="modal-footer"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">确认复制</button></div>`;openModal();let selectedFolderId=defaultTarget;const nameInput=modalCard.querySelector("#assetNameInput"),treeBox=modalCard.querySelector("#mineTargetTree"),tagInput=modalCard.querySelector("#saveTagInput"),label=modalCard.querySelector("#mineTargetLabel");function refreshLabel(){const target=findNode(trees.mine,selectedFolderId)?.node;label.textContent=target?`当前选择：${getMineFolderPath(target)}`:"请先选择目标位置";treeBox.querySelectorAll("[data-folder-id]").forEach(row=>row.classList.toggle("selected",row.dataset.folderId===selectedFolderId))}treeBox.addEventListener("click",e=>{const row=e.target.closest("[data-folder-id]");if(!row)return;selectedFolderId=row.dataset.folderId;refreshLabel()});modalCard.querySelector("#createMineFolderButton").onclick=()=>{const target=findNode(trees.mine,selectedFolderId)?.node;if(!target)return log("请先选择目标位置。");openNewFolderModal(target,created=>openAddToMineModal(source,title,created.id))};refreshLabel();modalCard.querySelector("[data-confirm]").onclick=()=>{const target=findNode(trees.mine,selectedFolderId)?.node;if(!target)return log("请选择目标文件夹。");const tags=parseTags(tagInput.value);const saved=source.map(s=>{const d=cloneNode(s,"");if(source.length===1){const next=nameInput.value.trim();if(!next)return null;d.name=next}d.tags=tags.length?tags:[...(s.tags||[])];return d}).filter(Boolean);if(!saved.length)return log("资产名称不能为空。");target.children=target.children||[];target.children.push(...saved);state.activeTab="mine";state.sharedProjectId=null;state.query="";searchInput.value="";state.selectedId=saved[0]?.id||target.id;let current=target;while(current){state.expandedByTab.mine.add(current.id);const parent=findNode(trees.mine,current.id)?.parent;current=parent}closeModal();render();log(`已复制到我的资源库：${getMineFolderPath(target)}，共 ${saved.length} 个副本。`)} }function getSharedFolderPath(project,node){
  const parts=[];
  let current=node;
  while(current&&current.id!==project.id){
    parts.unshift(current.name);
    const parent=findNode([project],current.id)?.parent;
    current=parent;
  }
  return project.name+(parts.length?" / "+parts.join(" / "):"");
}
function getSharedFolderTree(nodes,selectedId=null,depth=0){
  return nodes.filter(n=>n.type==="folder"&&!n.meta?.project).map(n=>{
    const children=n.children?.filter(c=>c.type==="folder")||[];
    const selected=n.id===selectedId?" selected":"";
    return `<div class="folder-tree-node"><button class="folder-tree-row${selected}" type="button" data-shared-folder-id="${n.id}" style="padding-left:${12+depth*18}px"><span class="folder-tree-icon">▸</span><span class="folder-tree-name">${esc(n.name)}</span></button>${children.length?`<div class="folder-tree-children">${getSharedFolderTree(children,selectedId,depth+1)}</div>`:""}</div>`;
  }).join("");
}
function openSharedModal(source=getCanvasSelectionForSave(),title="复制到团队",initialProjectId=null,initialFolderId=null){
  const projects=trees.shared.filter(p=>["edit","manage"].includes(p.meta.permission));
  if(!projects.length)return log("暂无可保存的团队，请联系团队管理员。");
  const defaultTags=parseTags(source.flatMap(s=>s.tags||[]).join("，"));
  let selectedProjectId=initialProjectId||projects[0].id;
  let selectedFolderId=initialFolderId||projects[0].children.find(n=>n.type==="folder")?.id||null;
  modalCard.innerHTML=`<div class="modal-header"><div class="modal-title">${esc(title)}</div><div class="modal-desc">将 ${source.length} 个内容复制到有权限的团队。</div></div><div class="modal-body"><div class="form-field"><label for="sharedAssetNameInput">资产名称</label><input id="sharedAssetNameInput" type="text" value="${esc(defaultSaveName(source))}" ${source.length>1?"disabled":""} autocomplete="off" /></div><div class="form-field"><label for="sharedProjectSelect">团队</label><select id="sharedProjectSelect">${projects.map(p=>`<option value="${p.id}">${esc(p.name)} · ${permissionText(p.meta.permission)}</option>`).join("")}</select></div><div class="form-field"><div class="field-head"><label>目标位置</label><button class="text-button" id="createSharedFolderButton" type="button">+ 新建文件夹</button></div><div class="folder-tree-picker" id="sharedTargetTree"></div><div class="folder-tree-current" id="sharedTargetLabel"></div></div><div class="form-field"><label for="sharedTagInput">标签</label><input id="sharedTagInput" type="text" value="${esc(defaultTags.join("，"))}" autocomplete="off" /></div><div class="modal-tip">团队由管理员创建、收集和授权；内容复制到团队文件夹后，不会自动绑定某一张画布。</div></div><div class="modal-footer"><button class="modal-action" data-close type="button">取消</button><button class="modal-action primary" data-confirm type="button">确认复制</button></div>`;
  openModal();
  const projectSelect=modalCard.querySelector("#sharedProjectSelect"),
    nameInput=modalCard.querySelector("#sharedAssetNameInput"),
    treeBox=modalCard.querySelector("#sharedTargetTree"),
    tagInput=modalCard.querySelector("#sharedTagInput"),
    label=modalCard.querySelector("#sharedTargetLabel"),
    createButton=modalCard.querySelector("#createSharedFolderButton");
  projectSelect.value=selectedProjectId;
  function currentProject(){return findNode(trees.shared,selectedProjectId)?.node||projects[0]}
  function currentTarget(){return findNode([currentProject()],selectedFolderId)?.node}
  function refreshSharedTree(){
    const project=currentProject();
    if(!findNode([project],selectedFolderId))selectedFolderId=project.children.find(n=>n.type==="folder")?.id||null;
    treeBox.innerHTML=getSharedFolderTree(project.children,selectedFolderId);
    const target=currentTarget();
    label.textContent=target?`当前选择：${getSharedFolderPath(project,target)}`:"请先选择目标位置";
    createButton.disabled=project.meta.permission!=="manage";
    createButton.textContent=project.meta.permission==="manage"?"+ 新建文件夹":"无新建权限";
    treeBox.querySelectorAll("[data-shared-folder-id]").forEach(row=>row.classList.toggle("selected",row.dataset.sharedFolderId===selectedFolderId));
  }
  projectSelect.onchange=()=>{
    selectedProjectId=projectSelect.value;
    const project=currentProject();
    selectedFolderId=project.children.find(n=>n.type==="folder")?.id||null;
    refreshSharedTree();
  };
  treeBox.addEventListener("click",e=>{const row=e.target.closest("[data-shared-folder-id]");if(!row)return;selectedFolderId=row.dataset.sharedFolderId;refreshSharedTree()});
  createButton.onclick=()=>{
    const project=currentProject(),target=currentTarget();
    if(project.meta.permission!=="manage")return log("当前团队没有新建文件夹权限，请联系管理员调整权限。");
    if(!target)return log("请先选择目标位置。");
    openNewFolderModal(target,created=>openSharedModal(source,title,project.id,created.id));
  };
  refreshSharedTree();
  modalCard.querySelector("[data-confirm]").onclick=()=>{
    const project=currentProject(),target=currentTarget();
    if(!target)return log("请选择团队保存文件夹。");
    const tags=parseTags(tagInput.value);
    const saved=source.map(s=>{const d=cloneNode(s,"");if(source.length===1){const next=nameInput.value.trim();if(!next)return null;d.name=next}d.tags=tags.length?tags:[...(s.tags||[])];d.permission=project.meta.permission;return d}).filter(Boolean);
    if(!saved.length)return log("资产名称不能为空。");
    target.children=target.children||[];
    target.children.push(...saved);
    state.activeTab="shared";
    state.sharedProjectId=project.id;
    state.selectedId=saved[0]?.id||target.id;
    state.query="";
    searchInput.value="";
    let current=target;
    while(current&&current.id!==project.id){state.expandedByTab.shared.add(current.id);const parent=findNode([project],current.id)?.parent;current=parent}
    closeModal();
    render();
    log(`已复制到团队：${getSharedFolderPath(project,target)}，共 ${saved.length} 个副本。`)
  }
}
function canvasNodeMarkup(n){if(n.type==="folder"){const children=(n.children||[]).slice(0,4);const minis=children.map(c=>`<div class="mini-node mini-${esc(c.assetType||"file")}"></div>`).join("")||'<div class="mini-node"></div>';return `<div class="group-title">${esc(n.name)}</div>${minis}`}if(n.assetType==="text")return `<strong>${esc(n.name)}</strong><p>${esc(n.description||"文本资源副本")}</p>`;if(n.assetType==="audio")return `<div class="thumb sent-audio-thumb"></div><strong>${esc(n.name)}</strong><span>音频节点</span>`;const thumb=n.assetType==="video"?"video-a":"image-a";return `<div class="thumb ${thumb}"></div><strong>${esc(n.name)}</strong><span>${esc(assetTypeLabel(n.assetType))}节点</span>`}
function canvasPosition(i){const points=[{left:39,top:41},{left:10,top:70},{left:72,top:16},{left:43,top:68},{left:69,top:72},{left:8,top:37},{left:30,top:22},{left:58,top:39}];return points[i%points.length]}
function renderCanvasBoard(){canvasBoard.querySelectorAll(".canvas-node,.canvas-group").forEach(el=>el.classList.remove("highlight","selected"));canvasBoard.querySelectorAll(".generated-canvas-node").forEach(el=>el.remove());const builtIn=new Set(["hero","hook","copy","canvas-group"]);const nodes=trees.canvas.filter(n=>!builtIn.has(n.id));nodes.forEach((n,i)=>{const el=document.createElement("div");el.className=n.type==="folder"?"canvas-group generated-canvas-node":"canvas-node generated-canvas-node";el.dataset.nodeId=n.id;el.dataset.generated="1";el.innerHTML=canvasNodeMarkup(n);const pos=canvasPosition(i);el.style.left=`${pos.left}%`;el.style.top=`${pos.top}%`;if(state.canvasSelection.includes(n.id))el.classList.add("selected");canvasBoard.appendChild(el);bindCanvasElement(el)});document.querySelectorAll(".canvas-node,.canvas-group").forEach(el=>el.classList.toggle("selected",state.canvasSelection.includes(el.dataset.nodeId==="group"?"canvas-group":el.dataset.nodeId)))}
function bindCanvasElement(el){if(el.dataset.boundCanvas)return;el.dataset.boundCanvas="1";el.style.cursor="grab";el.onpointerdown=e=>{if(e.button!==0)return;canvasDrag={el,startX:e.clientX,startY:e.clientY,left:el.offsetLeft,top:el.offsetTop,moved:false};el.classList.add("dragging");e.preventDefault()};el.onclick=e=>{if(el.dataset.skipClick)return;const id=el.dataset.nodeId==="group"?"canvas-group":el.dataset.nodeId;if(e.shiftKey){const next=new Set(state.canvasSelection);next.has(id)?next.delete(id):next.add(id);state.canvasSelection=[...next]}else state.canvasSelection=[id];document.querySelectorAll(".canvas-node,.canvas-group").forEach(x=>x.classList.toggle("selected",state.canvasSelection.includes(x.dataset.nodeId==="group"?"canvas-group":x.dataset.nodeId)));updateCanvasSelectionView()};el.oncontextmenu=e=>{const id=el.dataset.nodeId==="group"?"canvas-group":el.dataset.nodeId,n=findNode(trees.canvas,id)?.node;if(n)showContextMenu(e,n,"canvas")}}
function updateCanvasSelectionView(){const names=getCanvasSelectionForSave().map(n=>n.name);canvasSelectionLabel.textContent=names.length?`已选中：${names.join("、")}`:"未选中画布内容"}
canvasBoard.addEventListener("pointerdown",e=>{if(e.button!==0||e.target!==canvasBoard)return;const rect=canvasBoard.getBoundingClientRect();canvasSelect={startX:e.clientX,startY:e.clientY,rect,box:Object.assign(document.createElement("div"),{className:"canvas-selection-box"}),moved:false};canvasSelect.box.style.left="0px";canvasSelect.box.style.top="0px";canvasSelect.box.style.width="0px";canvasSelect.box.style.height="0px";canvasBoard.appendChild(canvasSelect.box);state.canvasSelection=[];document.querySelectorAll(".canvas-node,.canvas-group").forEach(x=>x.classList.remove("selected"));updateCanvasSelectionView();e.preventDefault()});
document.querySelectorAll(".tab,.panel-rail-tab").forEach(t=>t.onclick=()=>{
  state.activeTab=t.dataset.tab;
  state.query="";
  state.selectedId=null;
  state.sharedProjectId=null;
  searchInput.value="";
  hideLayers();
  render();
});
panelToggle.onclick=()=>{
  const collapsed=appShell.classList.toggle("panel-collapsed");
  panelToggle.title=collapsed?"展开资产库":"收起资产库";
  panelToggle.setAttribute("aria-label",panelToggle.title);
  hideLayers();
  render();
  log(collapsed?"已收起资产库。":"已展开资产库。");
};
searchInput.oninput=e=>{state.query=e.target.value;renderTree()};
rootCreateButton.onclick=e=>{e.stopPropagation();openRootFolderModal()};
collapseAllButton.onclick=()=>{getExpanded().clear();hideLayers();renderTree();log(`已收起当前 ${tabName(state.activeTab)} Tab 的所有文件夹。`)};
modalLayer.onclick=e=>{if(e.target===modalLayer)closeModal()};
document.onclick=e=>{if(!contextMenu.contains(e.target))contextMenu.classList.add("hidden")};
document.querySelectorAll(".canvas-node,.canvas-group").forEach(bindCanvasElement);
render();
