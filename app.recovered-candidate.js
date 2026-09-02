const state = {
  activeTab: "canvas",
  query: "",
  filter: "all",
  selectedId: null,
  folderCounter: 1,
  assetCounter: 1,
  sharedCounter: 1,
  sharedProjectId: null,
  canvasSelection: ["hero", "hook", "copy"],
  agentRefs: [],
  expandedByTab: {
    canvas: new Set(["canvas-group", "canvas-raw"]),
    mine: new Set(["mine-role", "mine-role-game", "mine-monster", "mine-monster-game", "mine-pet", "mine-pet-game", "mine-scene", "mine-scene-game", "mine-prop", "mine-prop-game", "mine-ui", "mine-ui-game", "mine-film", "mine-film-game", "mine-film-project", "mine-talent", "mine-talent-common", "mine-copy", "mine-copy-game", "mine-audio", "mine-audio-common", "mine-brand", "mine-brand-game", "mine-process", "mine-process-game", "mine-other", "mine-other-common"]),
    shared: new Set(["shared-project-1", "shared-role", "shared-brand"])
  }
};

const copy = {
  canvas: {
    subtitle: "当前画布资源导航",
    placeholder: "搜索当前画布节点",
  },
  mine: {
    subtitle: "个人资源分类与成片素材集�?,
    placeholder: "搜索我的资源",
  },
  shared: {
    subtitle: "有权限的项目资源�?,
    placeholder: "搜索扢�有共享库",
  }
};

const trees = {
  canvas: [
    item("hero", "萧峰_立绘", "image", "图片节点", "角色立绘，来自当前画�?, "萧峰_立绘"),
    folder("canvas-group", "成片素材集合_高福利开屢�", { group: true }, [
      item("hook", "高福利开屢�_A段钩�?, "video", "视频节点", "15s 竖版 A �?, "成片素材集合_高福利开屢�"),
      item("copy", "口播文案_v2", "text", "文本节点", "弢�屢�送满级福�?, "成片素材集合_高福利开屢�"),
      item("voice", "配音_热血男声", "audio", "音频节点", "12s 配音", "成片素材集合_高福利开屢�")
    ]),
    folder("canvas-raw", "临时草�6�0组_不收�?, { group: true }, [
      item("draft-1", "参��图_风格探索", "image", "图片节点", "草�6�0内容，可只留在画�?, "临时草�6�0组_不收�?)
    ])
  ],
  mine: [
    folder("mine-role", "角色", { fixed: true }, [
      folder("mine-role-game", "天龙八部2", {}, [
        item("mine-role-1", "萧峰_立绘_白底.png", "image", "图片", "个人副本", "角色 / 天龙八部2")
      ]),
      folder("mine-role-common", "通用", {}, [])
    ]),
    folder("mine-monster", "怪物/Boss", { fixed: true }, [
      folder("mine-monster-game", "天龙八部2", {}, [
        item("mine-monster-1", "黑龙Boss_立绘.png", "image", "图片", "爽点击杀素材", "怪物/Boss / 天龙八部2")
      ]),
      folder("mine-monster-common", "通用", {}, [])
    ]),
    folder("mine-pet", "宠物/坐骑", { fixed: true }, [
      folder("mine-pet-game", "天龙八部2", {}, [
        item("mine-pet-1", "青龙坐骑_三视�?png", "image", "图片", "辅助主体素材", "宠物/坐骑 / 天龙八部2")
      ]),
      folder("mine-pet-common", "通用", {}, [])
    ]),
    folder("mine-scene", "场景/地图", { fixed: true }, [
      folder("mine-scene-game", "天龙八部2", {}, [
        item("mine-scene-1", "洛阳城_战斗场景.png", "image", "图片", "常用背景素材", "场景/地图 / 天龙八部2")
      ]),
      folder("mine-scene-common", "通用", {}, [])
    ]),
    folder("mine-prop", "道具", { fixed: true }, [
      folder("mine-prop-game", "天龙八部2", {}, [
        item("mine-prop-1", "屠龙刢�_武器图标.png", "image", "图片", "武器、装备��礼包��货币等游戏物件", "道具 / 天龙八部2")
      ]),
      folder("mine-prop-common", "通用", {}, [])
    ]),
    folder("mine-ui", "UI", { fixed: true }, [
      folder("mine-ui-game", "天龙八部2", {}, [
        item("mine-ui-1", "活动入口_按钮.png", "image", "图片", "游戏内按钮��弹窗��图标等界面素材", "UI / 天龙八部2")
      ]),
      folder("mine-ui-common", "通用", {}, [])
    ]),
    folder("mine-film", "成片素材集合", { fixed: true }, [
      folder("mine-film-game", "天龙八部2", {}, [
        folder("mine-film-project", "高福利开屢�_竖版_20260803", {}, [
          item("mine-film-final", "朢�终成�?mp4", "video", "视频", "成片版本 v2", "成片素材集合 / 天龙八部2 / 高福利开屢�_竖版_20260803"),
          item("mine-film-hook", "A段钩�?mp4", "video", "视频", "可替换开头钩�?, "成片素材集合 / 天龙八部2 / 高福利开屢�_竖版_20260803"),
          item("mine-film-script", "口播文案.txt", "text", "文本", "BPM 提交前整�?, "成片素材集合 / 天龙八部2 / 高福利开屢�_竖版_20260803"),
          item("mine-film-voice", "配音.mp3", "audio", "音频", "男声版本", "成片素材集合 / 天龙八部2 / 高福利开屢�_竖版_20260803")
        ])
      ]),
      folder("mine-film-common", "通用", {}, [])
    ]),
    folder("mine-talent", "达人素材", { fixed: true }, [
      folder("mine-talent-common", "通用", {}, [
        item("mine-talent-1", "达人口播_热血�?mp4", "video", "视频", "主播、达人��真人演员��代訢�人等真人素材", "达人素材 / 通用")
      ])
    ]),
    folder("mine-copy", "文案/字幕", { fixed: true }, [
      folder("mine-copy-game", "天龙八部2", {}, [
        item("mine-copy-1", "高福利卖点_字幕.txt", "text", "文本", "标题、卖点��口播�6�0、字幕文�?, "文案/字幕 / 天龙八部2")
      ]),
      folder("mine-copy-common", "通用", {}, [])
    ]),
    folder("mine-audio", "音频素材", { fixed: true }, [
      folder("mine-audio-common", "通用", {}, [
        item("mine-audio-1", "热血BGM_15s.mp3", "audio", "音频", "BGM、音效��配音��旁�?, "音频素材 / 通用")
      ])
    ]),
    folder("mine-brand", "品牌/渠道素材", { fixed: true }, [
      folder("mine-brand-game", "天龙八部2", {}, [
        item("mine-kv", "主KV_春节活动_v1.png", "image", "图片", "渠道投放素材", "品牌/渠道素材 / 天龙八部2"),
        item("mine-banner", "渠道-banner-投放.png", "image", "图片", "买量素材", "品牌/渠道素材 / 天龙八部2")
      ]),
      folder("mine-brand-common", "通用", {}, [])
    ]),
    folder("mine-process", "过程文件", { fixed: true }, [
      folder("mine-process-game", "天龙八部2", {}, [
        item("mine-process-1", "BPM提交整理_高福利开屢�.zip", "file", "文件", "草�6�0、迭代�6�0、待审核稿和 BPM 提交前整理内�?, "过程文件 / 天龙八部2")
      ]),
      folder("mine-process-common", "通用", {}, [])
    ]),
    folder("mine-other", "其他", { fixed: true }, [
      folder("mine-other-common", "通用", {}, [
        item("mine-other-1", "临时参��图.png", "image", "图片", "无法归类的临时素�?, "其他 / 通用")
      ])
    ])
  ],
  shared: [
    folder("shared-project-1", "天龙八部2", { permission: "manage", project: true }, [
      folder("shared-role", "角色", { permission: "manage" }, [
        item("shared-role-1", "萧峰_三视�?png", "image", "图片", "可管�?, "天龙八部2 / 角色", "manage"),
        item("shared-role-2", "男弓箭_立绘.png", "image", "图片", "可管�?, "天龙八部2 / 角色", "manage")
      ]),
      folder("shared-brand", "品牌", { permission: "edit" }, [
        item("shared-logo", "logo-透明�?png", "image", "图片", "可编�?, "天龙八部2 / 品牌", "edit")
      ]),
      folder("shared-ui", "UI", { permission: "read" }, [
        item("shared-ui-1", "登录页_按钮.png", "image", "图片", "可阅�?, "天龙八部2 / UI", "read")
      ]),
      folder("shared-scene-folder", "场景", { permission: "read" }, [
        item("shared-scene-1", "洛阳城_场景原画.png", "image", "图片", "可阅�?, "天龙八部2 / 场景", "read")
      ])
    ]),
    folder("shared-project-2", "热血江湖", { permission: "read", project: true }, [
      folder("shared-project-2-role", "角色", { permission: "read" }, []),
      folder("shared-project-2-brand", "品牌", { permission: "read" }, [])
    ])
  ]
};

function folder(id, name, meta = {}, children = []) {
  return { id, name, type: "folder", meta, children };
}

function item(id, name, assetType, badge, description, path, permission) {
  return { id, name, type: "asset", assetType, badge, description, path, permission, tags: buildDefaultTags(name, assetType, path) };
}
function normalizeSharedLibraries() {
  const defaultCategories = ["角色", "品牌", "坐骑", "Boss", "宠物/怪物", "武器/道具", "UI", "场景", "渠道运营", "其他"];
  trees.shared.forEach((project) => {
    const permission = project.meta?.permission || "read";
    defaultCategories.forEach((name) => {
      if (!(project.children || []).some((child) => child.name === name)) {
        project.children.push(folder(`${project.id}-${name}`, name, { permission }, []));
      }
    });
    applyProjectPermission(project, permission);
  });
}

function applyProjectPermission(node, permission) {
  if (node.type === "folder") {
    node.meta = { ...node.meta, permission };
    (node.children || []).forEach((child) => applyProjectPermission(child, permission));
    return;
  }
  node.permission = permission;
  node.badge = permissionText(permission);
}

function getSharedProjectPermission(node) {
  if (state.activeTab !== "shared") return node.permission || node.meta?.permission;
  const project = findProjectForNode(trees.shared, node.id);
  return project?.meta?.permission || node.permission || node.meta?.permission || "read";
}

function findProjectForNode(nodes, id, currentProject = null) {
  for (const node of nodes) {
    const project = node.meta?.project ? node : currentProject;
    if (node.id === id) return project;
    const found = findProjectForNode(node.children || [], id, project);
    if (found) return found;
  }
  return null;
}
normalizeSharedLibraries();

const tabs = document.querySelectorAll(".tab");
const treeArea = document.querySelector("#treeArea");
const searchInput = document.querySelector("#searchInput");
const panelSubtitle = document.querySelector("#panelSubtitle");
const filterButton = document.querySelector("#filterButton");
const collapseAllButton = document.querySelector("#collapseAllButton");
const filterPopover = document.querySelector("#filterPopover");
const previewCard = document.querySelector("#previewCard");
const contextMenu = document.querySelector("#contextMenu");
const toastLog = document.querySelector("#toastLog");
const modalLayer = document.querySelector("#modalLayer");
const modalCard = document.querySelector("#modalCard");
const agentList = document.querySelector("#agentList");
const agentEmpty = document.querySelector("#agentEmpty");
const agentCount = document.querySelector("#agentCount");
const canvasSelectionLabel = document.querySelector(".canvas-selection");
let previewHideTimer = null;

previewCard.addEventListener("mouseenter", keepPreviewVisible);
previewCard.addEventListener("mouseleave", schedulePreviewHide);

function getExpanded() {
  return state.expandedByTab[state.activeTab];
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    state.activeTab = tab.dataset.tab;
    state.query = "";
    state.filter = "all";
    if (state.activeTab !== "shared") state.sharedProjectId = null;
    searchInput.value = "";
    updateFilterOptions();
    hideLayers();
    render();
  });
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value.trim().toLowerCase();
  renderTree();
});


filterButton.addEventListener("click", (event) => {
  event.stopPropagation();
  filterPopover.classList.toggle("hidden");
  filterButton.classList.toggle("active", !filterPopover.classList.contains("hidden"));
});

filterPopover.addEventListener("click", (event) => {
  const option = event.target.closest(".filter-option");
  if (!option) return;
  state.filter = option.dataset.filter;
  updateFilterOptions();
  filterPopover.classList.add("hidden");
  filterButton.classList.remove("active");
  renderTree();
});

collapseAllButton.addEventListener("click", () => {
  if (state.activeTab === "shared" && !state.sharedProjectId) {
    hideLayers();
    log("当前已在共享库列表��进入某个库后可丢�键收起库内分类��?);
    return;
  }
  getExpanded().clear();
  hideLayers();
  renderTree();
  log("已收起当�?Tab 的所有文件夹�?);
});

document.querySelector("#addMineButton").addEventListener("click", () => {
  openAddToMineModal(getCanvasSelectionForSave(), "保存当前选中内容");
});

document.querySelector("#addSharedButton").addEventListener("click", () => {
  openSharedModal(getCanvasSelectionForSave(), "加入共享资源�?);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".context-menu")) contextMenu.classList.add("hidden");
  if (!event.target.closest(".filter-popover") && !event.target.closest("#filterButton")) {
    filterPopover.classList.add("hidden");
    filterButton.classList.remove("active");
  }
});

modalLayer.addEventListener("click", (event) => {
  if (event.target === modalLayer) closeModal();
});


function initCanvasInteractions() {
  document.querySelectorAll("[data-node-id]").forEach(bindCanvasElement);
  document.querySelector("#canvasBoard").addEventListener("click", (event) => {
    if (event.target.closest("[data-node-id]")) return;
    selectCanvasNodes([]);
  });
  updateCanvasSelectionView();
}


function bindCanvasElement(element) {
  if (element.dataset.bound === "true") return;
  element.dataset.bound = "true";
  element.addEventListener("click", (event) => {
    event.stopPropagation();
    selectCanvasNodes([element.dataset.nodeId]);
  });
  element.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    selectCanvasNodes([element.dataset.nodeId]);
    showCanvasContextMenu(event, element.dataset.nodeId);
  });
}
function selectCanvasNodes(ids) {
  state.canvasSelection = ids;
  updateCanvasSelectionView();
}

function updateCanvasSelectionView() {
  document.querySelectorAll("[data-node-id]").forEach((element) => {
    element.classList.toggle("selected", state.canvasSelection.includes(element.dataset.nodeId));
  });
  const selectedNames = getCanvasSelectionForSave().map((node) => node.name);
  canvasSelectionLabel.textContent = selectedNames.length ? `已��中�?{selectedNames.join("�?)}` : "未��中画布内容";
}

function showCanvasContextMenu(event, domId) {
  const node = getCanvasResourceByDomId(domId);
  if (!node) {
    log("未找到对应画布节点��?);
    return;
  }
  const items = [
    { label: "加入我的资源�?, handler: () => openAddToMineModal([node], "保存到我的资源库") },
    { label: "加入共享资源�?, handler: () => openSharedModal([node], "加入共享资源�?) },
    { label: "创建副本", handler: () => createCanvasDuplicate(node) },
    { label: "编辑标签", handler: () => openTagModal(node) },
    { label: "引用�?Agent", handler: () => quoteToAgent(node) }
  ];
  contextMenu.innerHTML = "";
  items.forEach(({ label, handler }) => {
    const button = document.createElement("button");
    button.className = "menu-item";
    button.textContent = label;
    button.addEventListener("click", () => {
      handler();
      contextMenu.classList.add("hidden");
    });
    contextMenu.appendChild(button);
  });
  contextMenu.style.left = `${Math.min(event.clientX, window.innerWidth - 220)}px`;
  contextMenu.style.top = `${Math.min(event.clientY, window.innerHeight - items.length * 36 - 16)}px`;
  contextMenu.classList.remove("hidden");
}

function getCanvasResourceByDomId(domId) {
  const map = { hero: "hero", hook: "hook", copy: "copy", group: "canvas-group" };
  return findNodeWithParent(trees.canvas, map[domId] || domId)?.node;
}
function updateFilterOptions() {
  document.querySelectorAll(".filter-option").forEach((option) => {
    option.classList.toggle("active", option.dataset.filter === state.filter);
  });
}
function render() {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === state.activeTab));
  const tabCopy = copy[state.activeTab];
  const sharedProject = getActiveSharedProject();
  panelSubtitle.textContent = sharedProject ? `${sharedProject.name} 资源库` : tabCopy.subtitle;
  searchInput.placeholder = sharedProject ? "搜索当前�? : tabCopy.placeholder;
  renderTree();
}

function renderTree() {
  treeArea.innerHTML = "";

  if (state.activeTab === "shared") {
    renderSharedArea();
    return;
  }

  const filtered = filterNodes(trees[state.activeTab], state.query, state.filter);
  if (filtered.length === 0) {
    treeArea.innerHTML = '<div class="empty-state">没有找到匹配资源</div>';
    return;
  }
  filtered.forEach((node) => renderNode(node, 0));
}

function renderSharedArea() {
  const activeProject = getActiveSharedProject();
  if (!activeProject) {
    const projects = filterSharedProjects(state.query);
    if (projects.length === 0) {
      treeArea.innerHTML = '<div class="empty-state">没有找到匹配共享�?/div>';
      return;
    }
    projects.forEach(renderSharedProjectCard);
    return;
  }

  renderSharedLibraryHeader(activeProject);
  const filteredChildren = filterNodes(activeProject.children || [], state.query, state.filter);
  if (filteredChildren.length === 0) {
    treeArea.insertAdjacentHTML("beforeend", '<div class="empty-state">当前库内没有匹配资源</div>');
    return;
  }
  filteredChildren.forEach((node) => renderNode(node, 0));
}

function getActiveSharedProject() {
  return state.sharedProjectId ? findNodeWithParent(trees.shared, state.sharedProjectId)?.node : null;
}

function filterSharedProjects(query) {
  const keyword = query.trim().toLowerCase();
  return trees.shared.filter((project) => {
    if (!keyword) return true;
    return project.name.toLowerCase().includes(keyword) || countMatchingAssets(project, keyword) > 0;
  });
}

function countMatchingAssets(node, keyword) {
  return (node.children || []).reduce((total, child) => {
    const match = matchesQuery(child, keyword);
    return total + (match ? 1 : 0) + countMatchingAssets(child, keyword);
  }, 0);
}


function matchesQuery(node, query) {
  if (!query) return true;
  const fields = [
    node.name,
    node.path,
    node.badge,
    node.description,
    assetTypeLabel(node.assetType),
    ...(node.tags || [])
  ];
  return fields.some((field) => String(field || "").toLowerCase().includes(query));
}
function filterNodes(nodes, query, filter) {
  return nodes
    .map((node) => {
      const byQuery = matchesQuery(node, query);
      const nodeKind = node.type === "folder" ? "folder" : node.assetType;
      const byFilter = filter === "all" || nodeKind === filter;
      if (node.children) {
        const children = filterNodes(node.children, query, filter);
        if ((byQuery && byFilter) || children.length) return { ...node, children };
      }
      return byQuery && byFilter ? node : null;
    })
    .filter(Boolean);
}

function renderNode(node, depth) {
  const row = document.createElement("div");
  row.className = `tree-row ${state.selectedId === node.id ? "selected" : ""}`;
  row.style.paddingLeft = `${8 + depth * 18}px`;
  row.dataset.id = node.id;
  row.dataset.type = node.type;
  row.dataset.asset = node.type === "asset" ? node.assetType : "folder";
  row.innerHTML = `
    <span class="twisty">${node.children ? (getExpanded().has(node.id) ? "�? : "�?) : ""}</span>
    <span class="icon">${iconFor(node)}</span>
    <span class="tree-name" title="${escapeHtml(node.name)}">${escapeHtml(node.name)}</span>
  `;

  if (node.type === "folder") {
    row.addEventListener("click", () => {
      if (getExpanded().has(node.id)) getExpanded().delete(node.id);
      else getExpanded().add(node.id);
      renderTree();
    });
  } else {
    row.addEventListener("mouseenter", () => showPreview(row, node));
    row.addEventListener("mouseleave", schedulePreviewHide);
    row.addEventListener("click", () => selectRow(node));
  }

  row.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    selectRow(node);
    showContextMenu(event, node);
  });

  treeArea.appendChild(row);

  if (node.children && getExpanded().has(node.id)) {
    node.children.forEach((child) => renderNode(child, depth + 1));
  }
}



function renderSharedProjectCard(node) {
  const card = document.createElement("div");
  card.className = `shared-project-card ${state.selectedId === node.id ? "selected" : ""}`;
  card.dataset.id = node.id;
  const permission = node.meta?.permission || "read";
  const count = countAssets(node);
  card.innerHTML = `
    <div class="shared-cover ${permission}">
      <div class="shared-cover-title">${escapeHtml(node.name)}</div>
      <div class="shared-cover-subtitle">项目资源�?/div>
    </div>
    <div class="shared-card-main">
      <div>
        <div class="shared-card-name">${escapeHtml(node.name)}</div>
        <div class="shared-card-meta">${count} 个资�?· ${permissionDescription(permission)}</div>
      </div>
      <span class="shared-permission ${permission}">${permissionText(permission)}</span>
    </div>
    <div class="shared-card-footer">进入资源�?/div>
  `;
  card.addEventListener("click", () => {
    state.sharedProjectId = node.id;
    state.selectedId = node.id;
    state.query = "";
    state.filter = "all";
    if (state.activeTab !== "shared") state.sharedProjectId = null;
    searchInput.value = "";
    updateFilterOptions();
    hideLayers();
    render();
  });
  card.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    selectRow(node);
    showContextMenu(event, node);
  });
  treeArea.appendChild(card);
}

function renderSharedLibraryHeader(project) {
  const permission = project.meta?.permission || "read";
  const header = document.createElement("div");
  header.className = "shared-library-header";
  header.innerHTML = `
    <button class="shared-back" type="button" aria-label="返回共享库列�?>�?/button>
    <div class="shared-library-title">
      <div class="shared-library-name">${escapeHtml(project.name)}</div>
      <div class="shared-library-meta">${countAssets(project)} 个资�?· ${permissionDescription(permission)}</div>
    </div>
    <span class="shared-permission ${permission}">${permissionText(permission)}</span>
  `;
  header.querySelector(".shared-back").addEventListener("click", () => {
    state.sharedProjectId = null;
    state.selectedId = null;
    state.query = "";
    state.filter = "all";
    if (state.activeTab !== "shared") state.sharedProjectId = null;
    searchInput.value = "";
    updateFilterOptions();
    hideLayers();
    render();
  });
  treeArea.appendChild(header);
}

function countAssets(node) {
  return (node.children || []).reduce((total, child) => {
    if (child.type === "asset") return total + 1;
    return total + countAssets(child);
  }, 0);
}

function permissionDescription(permission) {
  if (permission === "manage") return "可整理资源��调整分类��管理成�?;
  if (permission === "edit") return "可加入和整理资源";
  return "可浏览��另存��发送到画布";
}
function iconFor(node) {
  if (node.type === "folder") return node.meta?.project ? "�? : node.meta?.group ? "�? : "�?;
  const icons = { image: "�?, video: "�?, text: "�?, audio: "�? };
  return icons[node.assetType] || "�?;
}


function buildDefaultTags(name, assetType, path = "") {
  const tags = [assetTypeLabel(assetType)];
  [name, path].join(" /").split(/[\s_\-\/]+/).forEach((part) => {
    const value = part.trim();
    if (value && value.length <= 12 && !tags.includes(value)) tags.push(value);
  });
  return tags.slice(0, 5);
}

function assetTypeLabel(assetType) {
  const labels = { image: "图片", video: "视频", text: "文案", audio: "音频", file: "文件" };
  return labels[assetType] || "资源";
}

function renderTagChips(node) {
  const tags = node.tags || [];
  if (!tags.length) return '<div class="preview-tags empty">暂无标签</div>';
  return `<div class="preview-tags">${tags.map((tag) => `<span class="tag-chip">${escapeHtml(tag)}</span>`).join("")}</div>`;
}

function openTagModal(node) {
  modalCard.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">编辑标签</div>
      <div class="modal-desc">为��?{escapeHtml(node.name)}」补充检索和 Agent 调用标签�?/div>
    </div>
    <div class="modal-body">
      <div class="form-field">
        <label for="tagInput">标签</label>
        <input id="tagInput" type="text" value="${escapeHtml((node.tags || []).join('�?))}" autocomplete="off" />
      </div>
      <div class="modal-tip">多个标签可用空格、��号或顿号分隔��标签用于搜紃6�9��筛选和 Agent 理解素材，不改变文件扢�在目录��?/div>
    </div>
    <div class="modal-footer">
      <button class="modal-action" type="button" data-close>取消</button>
      <button class="modal-action primary" type="button" data-confirm>保存</button>
    </div>
  `;
  modalLayer.classList.remove("hidden");
  const input = modalCard.querySelector("#tagInput");
  input.focus();
  input.select();
  modalCard.querySelector("[data-close]").addEventListener("click", closeModal);
  modalCard.querySelector("[data-confirm]").addEventListener("click", () => {
    node.tags = parseTags(input.value);
    closeModal();
    hideLayers();
    renderTree();
    log(`已更新标签：${node.name}`);
  });
}

function parseTags(value) {
  const seen = new Set();
  return value
    .split(/[\s,，��]+/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .filter((tag) => {
      if (seen.has(tag)) return false;
      seen.add(tag);
      return true;
    })
    .slice(0, 12);
}
function cloneTags(node) {
  return [...(node.tags || [])];
}

function showPreview(anchorRow, node) {
  keepPreviewVisible();
  const isCanvas = state.activeTab === "canvas";
  const action = isCanvas ? "定位到节�? : "发��到当前画布";
  previewCard.innerHTML = `
    <div class="preview-media preview-${node.assetType}">${node.assetType === "text" ? "文案摘要" : node.assetType === "audio" ? "音频波形" : ""}</div>
    <div class="preview-title">${escapeHtml(node.name)}</div>
    <div class="preview-meta">${escapeHtml(node.badge)} · ${escapeHtml(node.description)}</div>
    <div class="preview-path">${escapeHtml(node.path || "")}</div>
    ${renderTagChips(node)}
    <div class="preview-actions">
      <button class="preview-main" type="button">${action}</button>
      <button class="preview-secondary" type="button">引用�?Agent</button>
    </div>
  `;
  previewCard.querySelector(".preview-main").addEventListener("click", () => {
    if (isCanvas) locateNode(node.id);
    else sendToCanvas(node);
  });
  previewCard.querySelector(".preview-secondary").addEventListener("click", () => quoteToAgent(node));
  previewCard.classList.remove("hidden");
  positionPreview(anchorRow);
}

function positionPreview(anchorRow) {
  const rowRect = anchorRow.getBoundingClientRect();
  const panelRect = document.querySelector(".asset-panel").getBoundingClientRect();
  const previewRect = previewCard.getBoundingClientRect();
  const gap = 12;
  const left = Math.max(panelRect.right + gap, rowRect.right + gap);
  const maxTop = Math.max(12, window.innerHeight - previewRect.height - 12);
  const top = Math.min(Math.max(12, rowRect.top - 10), maxTop);
  previewCard.style.left = `${left}px`;
  previewCard.style.top = `${top}px`;
}

function schedulePreviewHide() {
  clearTimeout(previewHideTimer);
  previewHideTimer = setTimeout(() => previewCard.classList.add("hidden"), 140);
}

function keepPreviewVisible() {
  clearTimeout(previewHideTimer);
}
function showContextMenu(event, node) {
  const items = getMenuItems(node);
  contextMenu.innerHTML = "";
  items.forEach(({ label, handler, danger, disabled }) => {
    const button = document.createElement("button");
    button.className = `menu-item ${danger ? "danger" : ""}`;
    button.textContent = label;
    button.disabled = Boolean(disabled);
    button.addEventListener("click", () => {
      if (disabled) return;
      handler();
      contextMenu.classList.add("hidden");
    });
    contextMenu.appendChild(button);
  });
  contextMenu.style.left = `${Math.min(event.clientX, window.innerWidth - 220)}px`;
  contextMenu.style.top = `${Math.min(event.clientY, window.innerHeight - items.length * 36 - 16)}px`;
  contextMenu.classList.remove("hidden");
}

function getMenuItems(node) {
  const isFolder = node.type === "folder";
  const items = [];
  if (state.activeTab === "canvas") {
    if (!isFolder) items.push({ label: "预览", handler: () => log(`已打弢�预览�?{node.name}`) });
    if (!isFolder) items.push({ label: "引用�?Agent", handler: () => quoteToAgent(node) });
    if (!isFolder) items.push({ label: "编辑标签", handler: () => openTagModal(node) });
    items.push({ label: "创建副本", handler: () => createCanvasDuplicate(node) });
    items.push({ label: "加入我的资源�?, handler: () => openAddToMineModal([node], "保存到我的资源库") });
    items.push({ label: "加入共享资源�?, handler: () => openSharedModal([node], "加入共享资源�?) });
    return items;
  }

  if (state.activeTab === "mine" && isFolder) items.push({ label: "新建文件�?, handler: () => openNewFolderModal(node) });
  if (!isFolder) items.push({ label: "发��到画布", handler: () => sendToCanvas(node) });
  if (!isFolder) items.push({ label: "引用�?Agent", handler: () => quoteToAgent(node) });
  if (!isFolder) items.push({ label: "编辑标签", handler: () => openTagModal(node) });
  const permission = getSharedProjectPermission(node);
  items.push({ label: "创建副本", handler: () => duplicateLibraryNode(node), disabled: state.activeTab === "shared" && permission === "read" });
  if (isFolder) items.push({ label: "发��到画布", handler: () => sendFolderToCanvas(node) });
  if (state.activeTab === "shared" && !isFolder) items.push({ label: "另存到我�?, handler: () => openAddToMineModal([node], "另存到我的资源库") });
  items.push({ label: "下载", handler: () => log(`已模拟下载：${node.name}`), disabled: isFolder && state.activeTab === "mine" });

  const canEditSharedAsset = state.activeTab !== "shared" || permission === "edit" || permission === "manage";
  const canManageSharedFolder = state.activeTab !== "shared" || permission === "manage" || (!isFolder && permission === "edit");

  items.push({ label: "重命�?, handler: () => openRenameModal(node), disabled: node.meta?.fixed || (isFolder && !canManageSharedFolder) || (!isFolder && !canEditSharedAsset) });
  items.push({ label: "移动", handler: () => openMoveModal(node), disabled: node.meta?.project || (isFolder && !canManageSharedFolder) || (!isFolder && !canEditSharedAsset) });
  items.push({ label: "删除", handler: () => openDeleteModal(node), danger: true, disabled: node.meta?.fixed || node.meta?.project || (isFolder && !canManageSharedFolder) || (!isFolder && !canEditSharedAsset) });

  if (state.activeTab === "shared" && node.meta?.project && permission === "manage") {
    items.unshift({ label: "管理成员", handler: () => log("已模拟：打开成员权限管理�?) });
    items.unshift({ label: "新建文件�?, handler: () => openNewFolderModal(node) });
  }

  return items;
}

function selectRow(node) {
  state.selectedId = node.id;
  document.querySelectorAll(".tree-row").forEach((row) => {
    row.classList.toggle("selected", row.dataset.id === node.id);
  });
}


function createCanvasDuplicate(sourceNode) {
  const duplicate = cloneNodeForCanvas(sourceNode);
  trees.canvas.push(duplicate);
  appendCanvasDuplicate(duplicate);
  state.canvasSelection = [duplicate.id];
  updateCanvasSelectionView();
  if (state.activeTab === "canvas") renderTree();
  log(`已在画布创建副本�?{duplicate.name}`);
}

function cloneNodeForCanvas(sourceNode) {
  if (sourceNode.type === "folder") {
    return folder(`canvas-dup-group-${state.folderCounter++}`, `${sourceNode.name}_副本`, { group: true }, (sourceNode.children || []).map(cloneNodeForCanvas));
  }
  const duplicate = item(
    `canvas-dup-${state.assetCounter++}`,
    getSavedResourceName(sourceNode.name),
    sourceNode.assetType || "file",
    sourceNode.badge || "副本",
    sourceNode.description || "画布副本",
    sourceNode.path || sourceNode.name
  );
  duplicate.tags = cloneTags(sourceNode);
  return duplicate;
}

function appendCanvasDuplicate(node) {
  const board = document.querySelector("#canvasBoard");
  const element = document.createElement("div");
  element.dataset.nodeId = node.id;
  element.className = node.type === "folder" ? "canvas-group highlight" : `canvas-node highlight ${canvasClassForType(node.assetType)}`;
  element.style.left = `${16 + Math.random() * 52}%`;
  element.style.top = `${18 + Math.random() * 54}%`;
  if (node.type === "folder") {
    element.innerHTML = `<div class="group-title">${escapeHtml(node.name)}</div><div class="mini-node mini-video"></div><div class="mini-node mini-text"></div><div class="mini-node mini-audio"></div>`;
  } else if (node.assetType === "image" || node.assetType === "video") {
    element.innerHTML = `<div class="thumb ${node.assetType === "image" ? "image-a" : "video-a"}"></div><strong>${escapeHtml(node.name)}</strong><span>${escapeHtml(node.badge || "画布副本")}</span>`;
  } else {
    element.innerHTML = `<strong>${escapeHtml(node.name)}</strong><p>${escapeHtml(node.description || "画布副本")}</p>`;
  }
  document.querySelectorAll(".highlight").forEach((item) => item.classList.remove("highlight"));
  board.appendChild(element);
  bindCanvasElement(element);
}

function canvasClassForType(type) {
  if (type === "image") return "image-node";
  if (type === "video") return "video-node";
  if (type === "text") return "text-node";
  return "";
}

function duplicateLibraryNode(node) {
  const record = findNodeWithParent(trees[state.activeTab], node.id);
  if (!record) {
    log("资源不存在，可能已被删除�?);
    return;
  }
  const siblings = record.parent ? record.parent.children : trees[state.activeTab];
  const index = siblings.findIndex((item) => item.id === record.node.id);
  const duplicate = cloneNodeForLibrary(record.node);
  siblings.splice(index + 1, 0, duplicate);
  state.selectedId = duplicate.id;
  renderTree();
  log(`已创建副本：${duplicate.name}`);
}

function cloneNodeForLibrary(sourceNode) {
  if (sourceNode.type === "folder") {
    return folder(`${state.activeTab}-dup-folder-${state.folderCounter++}`, getSavedResourceName(sourceNode.name), { ...sourceNode.meta, fixed: false, project: false }, (sourceNode.children || []).map(cloneNodeForLibrary));
  }
  const duplicate = item(
    `${state.activeTab}-dup-${state.assetCounter++}`,
    getSavedResourceName(sourceNode.name),
    sourceNode.assetType || "file",
    sourceNode.badge || "副本",
    sourceNode.description || "资源副本",
    sourceNode.path || sourceNode.name,
    sourceNode.permission
  );
  duplicate.tags = cloneTags(sourceNode);
  return duplicate;
}
function locateNode(id) {
  const map = { hero: "hero", hook: "hook", copy: "copy", voice: "group", "draft-1": "group" };
  const target = document.querySelector(`[data-node-id="${map[id] || id}"]`);
  if (!target) {
    log("未找到可定位目标，节点可能已被删除��?);
    return;
  }
  document.querySelectorAll(".highlight").forEach((node) => node.classList.remove("highlight"));
  target.classList.add("highlight");
  target.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  log(`已定位到画布节点�?{target.dataset.nodeId}`);
}

function quoteToAgent(node) {
  const source = state.activeTab === "canvas" ? "画布" : state.activeTab === "mine" ? "我的" : "共享";
  const exists = state.agentRefs.some((item) => item.id === node.id && item.source === source);
  if (exists) {
    log(`Agent 已引用过�?{node.name}`);
    return;
  }
  state.agentRefs.unshift({
    id: node.id,
    name: node.name,
    type: node.assetType,
    source,
    path: node.path || node.name,
    permission: state.activeTab === "shared" ? permissionText(getSharedProjectPermission(node)) : "-",
    tags: node.tags || []
  });
  renderAgentRefs();
  log(`已引用到 Agent�?{node.name}。Agent 可按来源和路径调用该素材。`);
}

function renderAgentRefs() {
  agentCount.textContent = String(state.agentRefs.length);
  agentEmpty.classList.toggle("hidden", state.agentRefs.length > 0);
  agentList.innerHTML = state.agentRefs
    .map((item) => `
      <div class="agent-ref-item">
        <div class="agent-ref-name">${escapeHtml(item.name)}</div>
        <div class="agent-ref-path">${escapeHtml(item.source)} / ${escapeHtml(item.path)}${item.permission && item.permission !== "-" ? ` · ${escapeHtml(item.permission)}` : ""}</div>
        <div class="agent-ref-tags">${escapeHtml((item.tags || []).join("�?))}</div>
      </div>
    `)
    .join("");
}
function sendToCanvas(node) {
  const duplicate = cloneNodeForCanvas(node);
  trees.canvas.push(duplicate);
  appendCanvasDuplicate(duplicate);
  state.canvasSelection = [duplicate.id];
  updateCanvasSelectionView();
  log(`已发送到当前画布�?{node.name}。发送后为独立副本，不与源资源绑定��`);
}

function sendFolderToCanvas(node) {
  const duplicate = cloneNodeForCanvas(node);
  trees.canvas.push(duplicate);
  appendCanvasDuplicate(duplicate);
  state.canvasSelection = [duplicate.id];
  updateCanvasSelectionView();
  log(`已发送文件夹到当前画布：${node.name}。系统已按文件夹生成画布组副本��`);
}

function openNewFolderModal(anchorNode = null) {
  const target = getCreateTarget(anchorNode);
  modalCard.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">新建文件�?/div>
      <div class="modal-desc">将在�?{escapeHtml(target.label)}」下新建丢�个文件夹�?/div>
    </div>
    <div class="modal-body">
      <div class="form-field">
        <label for="folderNameInput">文件夹名�?/label>
        <input id="folderNameInput" type="text" value="新建文件�? autocomplete="off" />
      </div>
    </div>
    <div class="modal-footer">
      <button class="modal-action" type="button" data-close>取消</button>
      <button class="modal-action primary" type="button" data-confirm>创建</button>
    </div>
  `;
  modalLayer.classList.remove("hidden");
  const input = modalCard.querySelector("#folderNameInput");
  input.focus();
  input.select();
  modalCard.querySelector("[data-close]").addEventListener("click", closeModal);
  modalCard.querySelector("[data-confirm]").addEventListener("click", () => {
    const name = input.value.trim() || "新建文件�?;
    const newId = `${state.activeTab}-custom-folder-${state.folderCounter++}`;
    target.children.push(folder(newId, name, {}, []));
    getExpanded().add(target.parentId || newId);
    if (target.parentId) getExpanded().add(target.parentId);
    state.selectedId = newId;
    closeModal();
    state.query = "";
    searchInput.value = "";
    state.filter = "all";
    updateFilterOptions();
    renderTree();
    log(`已在�?{target.label}」下新建文件夹：${name}`);
  });
}


function openRenameModal(node) {
  const record = findNodeWithParent(trees[state.activeTab], node.id);
  if (!record) {
    log("资源不存在，可能已被删除�?);
    return;
  }
  modalCard.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">重命�?/div>
      <div class="modal-desc">修改�?{escapeHtml(record.node.name)}」的名称�?/div>
    </div>
    <div class="modal-body">
      <div class="form-field">
        <label for="renameInput">名称</label>
        <input id="renameInput" type="text" value="${escapeHtml(record.node.name)}" autocomplete="off" />
      </div>
    </div>
    <div class="modal-footer">
      <button class="modal-action" type="button" data-close>取消</button>
      <button class="modal-action primary" type="button" data-confirm>保存</button>
    </div>
  `;
  modalLayer.classList.remove("hidden");
  const input = modalCard.querySelector("#renameInput");
  input.focus();
  input.select();
  modalCard.querySelector("[data-close]").addEventListener("click", closeModal);
  modalCard.querySelector("[data-confirm]").addEventListener("click", () => {
    const nextName = input.value.trim();
    if (!nextName) {
      log("名称不能为空�?);
      return;
    }
    const siblings = record.parent ? record.parent.children : trees[state.activeTab];
    const duplicate = siblings.some((item) => item.id !== record.node.id && item.name === nextName);
    if (duplicate) {
      log("同一层级已有同名文件或文件夹�?);
      return;
    }
    const oldName = record.node.name;
    record.node.name = nextName;
    state.agentRefs.forEach((item) => {
      if (item.id === record.node.id) item.name = nextName;
    });
    renderAgentRefs();
    closeModal();
    hideLayers();
    renderTree();
    log(`已重命名�?{oldName} -> ${nextName}`);
  });
}

function openMoveModal(node) {
  const record = findNodeWithParent(trees[state.activeTab], node.id);
  if (!record) {
    log("资源不存在，可能已被删除�?);
    return;
  }
  const folders = collectFolderOptions(trees[state.activeTab], record.node);
  if (folders.length === 0) {
    log("当前没有可移动到的目标文件夹�?);
    return;
  }
  modalCard.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">选择移动位置</div>
      <div class="modal-desc">移动�?{escapeHtml(record.node.name)}」到目标文件夹��?/div>
    </div>
    <div class="modal-body">
      <div class="form-field">
        <label for="moveTargetSelect">目标文件�?/label>
        <select id="moveTargetSelect">
          ${folders.map((folder) => `<option value="${escapeHtml(folder.id)}">${escapeHtml(folder.label)}</option>`).join("")}
        </select>
      </div>
      <div class="modal-tip">移动后会立即更新当前目录结构；不会影响画布或其他库里的独立副本��?/div>
    </div>
    <div class="modal-footer">
      <button class="modal-action" type="button" data-close>取消</button>
      <button class="modal-action primary" type="button" data-confirm>确认移动</button>
    </div>
  `;
  modalLayer.classList.remove("hidden");
  modalCard.querySelector("[data-close]").addEventListener("click", closeModal);
  modalCard.querySelector("[data-confirm]").addEventListener("click", () => {
    const targetId = modalCard.querySelector("#moveTargetSelect").value;
    const latestRecord = findNodeWithParent(trees[state.activeTab], record.node.id);
    const targetRecord = findNodeWithParent(trees[state.activeTab], targetId);
    if (!latestRecord || !targetRecord?.node?.children) {
      closeModal();
      log("移动失败，目标位置不存在�?);
      return;
    }
    const sourceSiblings = latestRecord.parent ? latestRecord.parent.children : trees[state.activeTab];
    const sourceIndex = sourceSiblings.findIndex((item) => item.id === latestRecord.node.id);
    if (sourceIndex >= 0) sourceSiblings.splice(sourceIndex, 1);
    targetRecord.node.children.push(latestRecord.node);
    getExpanded().add(targetRecord.node.id);
    state.selectedId = latestRecord.node.id;
    closeModal();
    hideLayers();
    renderTree();
    log(`已移动到�?{targetRecord.node.name}`);
  });
}

function collectFolderOptions(nodes, movingNode, trail = []) {
  const options = [];
  nodes.forEach((node) => {
    if (node.type !== "folder") return;
    const currentTrail = [...trail, node.name];
    const movingSelf = node.id === movingNode.id;
    const movingDescendant = movingNode.type === "folder" && containsNode(movingNode.children || [], node.id);
    if (!movingSelf && !movingDescendant) {
      options.push({ id: node.id, label: currentTrail.join(" / ") });
    }
    options.push(...collectFolderOptions(node.children || [], movingNode, currentTrail));
  });
  return options;
}

function containsNode(nodes, id) {
  return nodes.some((node) => node.id === id || containsNode(node.children || [], id));
}
function getCreateTarget(anchorNode = null) {
  const selected = anchorNode || findNodeWithParent(trees[state.activeTab], state.selectedId)?.node;
  const found = selected ? findNodeWithParent(trees[state.activeTab], selected.id) : null;

  if (found?.node?.type === "folder") {
    return { children: found.node.children, label: found.node.name, parentId: found.node.id };
  }

  if (found?.parent) {
    return { children: found.parent.children, label: found.parent.name, parentId: found.parent.id };
  }

  return { children: trees[state.activeTab], label: currentTabName(), parentId: null };
}

function findNodeWithParent(nodes, id, parent = null) {
  if (!id) return null;
  for (const node of nodes) {
    if (node.id === id) return { node, parent };
    if (node.children) {
      const found = findNodeWithParent(node.children, id, node);
      if (found) return found;
    }
  }
  return null;
}

function currentTabName() {
  if (state.activeTab === "mine") return "我的丢�级目�?;
  if (state.activeTab === "shared") return getActiveSharedProject()?.name || "共享库列�?;
  return "画布丢�级目�?;
}
function openPositionModal(title, desc, actionText) {
  modalCard.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">${escapeHtml(title)}</div>
      <div class="modal-desc">${escapeHtml(desc)}</div>
    </div>
    <div class="modal-body">
      <div class="form-field">
        <label for="targetCategory">资源分类</label>
        <select id="targetCategory">
          <option>角色</option>
          <option>成片素材集合</option>
          <option>品牌/渠道素材</option>
          <option>文案/字幕</option>
          <option>其他</option>
        </select>
      </div>
      <div class="form-field">
        <label for="targetFolder">项目/通用文件�?/label>
        <select id="targetFolder">
          <option>天龙八部2</option>
          <option>热血江湖</option>
          <option>通用</option>
          <option>+ 新建文件�?/option>
        </select>
      </div>
      <div class="modal-tip">保存后生成个人资产副本；目标路径从真实一级文件夹弢�始记录，不包�?Tab 名称�?/div>
    </div>
    <div class="modal-footer">
      <button class="modal-action" type="button" data-close>取消</button>
      <button class="modal-action primary" type="button" data-confirm>${escapeHtml(actionText)}</button>
    </div>
  `;
  bindModalButtons(`${actionText}成功，已生成独立副本。`);
}

function getCanvasSelectionForSave() {
  return state.canvasSelection
    .map((id) => getCanvasResourceByDomId(id) || findNodeWithParent(trees.canvas, id)?.node)
    .filter(Boolean);
}

function openAddToMineModal(sourceNodes, title = "保存到我的资源库") {
  if (!sourceNodes.length) {
    log("当前没有可保存的画布内容�?);
    return;
  }
  const categories = getMineCategories();
  modalCard.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">${escapeHtml(title)}</div>
      <div class="modal-desc">�?${sourceNodes.length} 个内容复制为个人资产副本�?/div>
    </div>
    <div class="modal-body">
      <div class="form-field">
        <label for="mineCategorySelect">资源分类</label>
        <select id="mineCategorySelect">
          ${categories.map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`).join("")}
        </select>
      </div>
      <div class="form-field">
        <label for="mineFolderSelect">目标文件�?/label>
        <select id="mineFolderSelect"></select>
      </div>
      <div class="form-field hidden" id="mineNewFolderField">
        <label for="mineNewFolderInput">新文件夹名称</label>
        <input id="mineNewFolderInput" type="text" value="天龙八部2" autocomplete="off" />
      </div>
      <div class="modal-tip">保存后会在��我的��中生成独立副本，不影响画布原节点��?/div>
    </div>
    <div class="modal-footer">
      <button class="modal-action" type="button" data-close>取消</button>
      <button class="modal-action primary" type="button" data-confirm>确认保存</button>
    </div>
  `;
  modalLayer.classList.remove("hidden");
  const categorySelect = modalCard.querySelector("#mineCategorySelect");
  const folderSelect = modalCard.querySelector("#mineFolderSelect");
  const newFolderField = modalCard.querySelector("#mineNewFolderField");
  const newFolderInput = modalCard.querySelector("#mineNewFolderInput");

  const syncFolderOptions = () => {
    const category = findNodeWithParent(trees.mine, categorySelect.value)?.node;
    const folders = (category?.children || []).filter((node) => node.type === "folder");
    folderSelect.innerHTML = folders
      .map((node) => `<option value="${escapeHtml(node.id)}">${escapeHtml(node.name)}</option>`)
      .join("") + '<option value="__new__">+ 新建文件�?/option>';
    newFolderField.classList.toggle("hidden", folderSelect.value !== "__new__");
  };

  categorySelect.addEventListener("change", syncFolderOptions);
  folderSelect.addEventListener("change", () => {
    newFolderField.classList.toggle("hidden", folderSelect.value !== "__new__");
    if (folderSelect.value === "__new__") {
      newFolderInput.focus();
      newFolderInput.select();
    }
  });
  syncFolderOptions();

  modalCard.querySelector("[data-close]").addEventListener("click", closeModal);
  modalCard.querySelector("[data-confirm]").addEventListener("click", () => {
    const category = findNodeWithParent(trees.mine, categorySelect.value)?.node;
    if (!category) {
      log("目标分类不存在��?);
      return;
    }
    let targetFolder = findNodeWithParent(trees.mine, folderSelect.value)?.node;
    if (folderSelect.value === "__new__") {
      const folderName = newFolderInput.value.trim();
      if (!folderName) {
        log("新文件夹名称不能为空�?);
        return;
      }
      targetFolder = folder(`mine-saved-folder-${state.folderCounter++}`, folderName, {}, []);
      category.children.push(targetFolder);
      state.expandedByTab.mine.add(category.id);
    }
    if (!targetFolder) {
      log("目标文件夹不存在�?);
      return;
    }
    const savedNodes = sourceNodes.map((sourceNode) => cloneNodeForMine(sourceNode, targetFolder, category.name));
    targetFolder.children.push(...savedNodes);
    state.expandedByTab.mine.add(category.id);
    state.expandedByTab.mine.add(targetFolder.id);
    state.activeTab = "mine";
    state.query = "";
    state.filter = "all";
    if (state.activeTab !== "shared") state.sharedProjectId = null;
    searchInput.value = "";
    updateFilterOptions();
    state.selectedId = savedNodes[0]?.id || targetFolder.id;
    closeModal();
    hideLayers();
    render();
    log(`已保存到我的资源库：${category.name} / ${targetFolder.name}，共 ${savedNodes.length} 个副本��`);
  });
}

function getMineCategories() {
  return trees.mine.filter((node) => node.type === "folder");
}

function cloneNodeForMine(sourceNode, targetFolder, categoryName) {
  const path = `${categoryName} / ${targetFolder.name}`;
  if (sourceNode.type === "folder") {
    return folder(`mine-saved-folder-${state.folderCounter++}`, `${sourceNode.name}_副本`, {}, (sourceNode.children || []).map((child) => cloneNodeForMine(child, targetFolder, categoryName)));
  }
  const duplicate = item(
    `mine-saved-${state.assetCounter++}`,
    getSavedResourceName(sourceNode.name),
    sourceNode.assetType || "file",
    sourceNode.badge || "副本",
    sourceNode.description || "从画布保存的个人副本",
    path
  );
  duplicate.tags = cloneTags(sourceNode);
  return duplicate;
}

function getSavedResourceName(name) {
  const dotIndex = name.lastIndexOf(".");
  if (dotIndex > 0) return `${name.slice(0, dotIndex)}_副本${name.slice(dotIndex)}`;
  return `${name}_副本`;
}
function openSharedModal(sourceNodes = getCanvasSelectionForSave(), title = "加入共享资源�?) {
  const nodes = Array.isArray(sourceNodes) ? sourceNodes : getCanvasSelectionForSave();
  if (!nodes.length) {
    log("当前没有可加入共享的内容�?);
    return;
  }
  const projects = trees.shared.filter((node) => node.type === "folder" && node.meta?.permission !== "read");
  modalCard.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">${escapeHtml(title)}</div>
      <div class="modal-desc">�?${nodes.length} 个内容复制到有权限的项目共享资源库��?/div>
    </div>
    <div class="modal-body">
      <div class="form-field">
        <label for="sharedProjectSelect">项目资源�?/label>
        <select id="sharedProjectSelect">
          ${projects.map((project) => `<option value="${escapeHtml(project.id)}">${escapeHtml(project.name)} · ${permissionText(project.meta?.permission)}</option>`).join("")}
        </select>
      </div>
      <div class="form-field">
        <label for="sharedCategorySelect">资产分类</label>
        <select id="sharedCategorySelect"></select>
      </div>
      <div class="modal-tip">项目资源库由画布项目映射生成，不能在这里手动新建；确认后会生成共享副本，原画布内容保持不变��?/div>
    </div>
    <div class="modal-footer">
      <button class="modal-action" type="button" data-close>取消</button>
      <button class="modal-action primary" type="button" data-confirm>确认加入</button>
    </div>
  `;
  modalLayer.classList.remove("hidden");
  const projectSelect = modalCard.querySelector("#sharedProjectSelect");
  const categorySelect = modalCard.querySelector("#sharedCategorySelect");

  const syncSharedCategories = () => {
    const project = findNodeWithParent(trees.shared, projectSelect.value)?.node;
    const categories = (project?.children || []).filter((node) => node.type === "folder");
    categorySelect.innerHTML = categories.map((category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.name)}</option>`).join("");
  };

  projectSelect.addEventListener("change", syncSharedCategories);
  syncSharedCategories();
  modalCard.querySelector("[data-close]").addEventListener("click", closeModal);
  modalCard.querySelector("[data-confirm]").addEventListener("click", () => {
    const project = findNodeWithParent(trees.shared, projectSelect.value)?.node;
    const category = findNodeWithParent(trees.shared, categorySelect.value)?.node;
    if (!project || !category) {
      log("共享目标位置不存在��?);
      return;
    }
    const savedNodes = nodes.map((node) => cloneNodeForShared(node, project.name, category.name, project.meta?.permission));
    category.children.push(...savedNodes);
    state.expandedByTab.shared.add(category.id);
    state.activeTab = "shared";
    state.sharedProjectId = project.id;
    state.query = "";
    state.filter = "all";
    if (state.activeTab !== "shared") state.sharedProjectId = null;
    searchInput.value = "";
    updateFilterOptions();
    state.selectedId = savedNodes[0]?.id || category.id;
    closeModal();
    hideLayers();
    render();
    log(`已加入共享资源库�?{project.name} / ${category.name}，共 ${savedNodes.length} 个副本��`);
  });
}

function cloneNodeForShared(sourceNode, projectName, categoryName, permission = "edit") {
  if (sourceNode.type === "folder") {
    return folder(`shared-saved-folder-${state.sharedCounter++}`, `${sourceNode.name}_副本`, { permission }, (sourceNode.children || []).map((child) => cloneNodeForShared(child, projectName, categoryName, permission)));
  }
  const duplicate = item(
    `shared-saved-${state.sharedCounter++}`,
    getSavedResourceName(sourceNode.name),
    sourceNode.assetType || "file",
    sourceNode.badge || "副本",
    sourceNode.description || "从画布加入共享的副本",
    `${projectName} / ${categoryName}`,
    permission
  );
  duplicate.tags = cloneTags(sourceNode);
  return duplicate;
}

function permissionText(permission) {
  if (permission === "manage") return "可管�?;
  if (permission === "edit") return "可编�?;
  return "可阅�?;
}

function openDeleteModal(node) {
  modalCard.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">确认删除</div>
      <div class="modal-desc">删除 ${escapeHtml(node.name)} 前需要二次确认��?/div>
    </div>
    <div class="modal-body">
      <div class="modal-tip">删除不会影响画布上的独立节点，也不会影响其他库里的独立副本��?/div>
    </div>
    <div class="modal-footer">
      <button class="modal-action" type="button" data-close>取消</button>
      <button class="modal-action primary" type="button" data-confirm>确认删除</button>
    </div>
  `;
    modalLayer.classList.remove("hidden");
  modalCard.querySelector("[data-close]").addEventListener("click", closeModal);
  modalCard.querySelector("[data-confirm]").addEventListener("click", () => {
    const record = findNodeWithParent(trees[state.activeTab], node.id);
    if (!record) {
      closeModal();
      log("资源不存在，可能已被删除�?);
      return;
    }
    const siblings = record.parent ? record.parent.children : trees[state.activeTab];
    const index = siblings.findIndex((item) => item.id === record.node.id);
    if (index >= 0) siblings.splice(index, 1);
    getExpanded().delete(record.node.id);
    state.selectedId = null;
    closeModal();
    hideLayers();
    renderTree();
    log(`已删除：${node.name}`);
  });
}

function bindModalButtons(message) {
  modalLayer.classList.remove("hidden");
  modalCard.querySelector("[data-close]").addEventListener("click", closeModal);
  modalCard.querySelector("[data-confirm]").addEventListener("click", () => {
    closeModal();
    log(message);
  });
}

function closeModal() {
  modalLayer.classList.add("hidden");
}

function hideLayers() {
  previewCard.classList.add("hidden");
  contextMenu.classList.add("hidden");
  closeModal();
}

function log(message) {
  toastLog.textContent = message;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

render();
renderAgentRefs();
initCanvasInteractions();






