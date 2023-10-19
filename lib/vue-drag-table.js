(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".tree-column{position:relative;padding:12px;min-width:60px;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;box-sizing:border-box}.tree-column.border{border-right:1px solid #eee}.resize-line{position:absolute;top:0;right:-3px;width:6px;height:100%;cursor:col-resize}.space{display:inline-block;width:15px}.tree-block{width:100%;background:rgba(255,255,255,.8)}.tree-row{position:relative;display:flex;border-bottom:1px solid #eee;line-height:32px}.tree-row:hover{background:#ecf5ff}.tree-row.highlight-row{background:#ffe88c}.tree-row .align-left{text-align:left}.tree-row .align-right{text-align:right}.tree-row .align-center{text-align:center}.hover-model{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.6)}.hover-block{display:flex;opacity:.1;transition:opacity .5s;justify-content:center;align-items:center}.hover-block i{color:#fff}.prev-block{height:25%;background:#a0c8f7}.center-block{height:50%;background:#a0c8f7}.next-block{height:25%;background:#a0c8f7}.action-item{color:#409eff;cursor:pointer}.action-item i{font-style:normal}.zip-icon{display:inline-block;width:10px;height:10px;vertical-align:middle;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAf0lEQVQ4T7XT0Q2AMAhF0dvNdALdSEdzBB3BDXQD85LGRNMCauS7nAKBxMdIhfwemIAtYpeAEeiANoLUgAGYI4gFqAMX8QAXiQBCNFDNRBVdIgpUkSfADjT3KqLACmg/XrWw5J+Li+VVYCZrMBbgJluA+tXA3Hv45ZgiR3i+OQBeSyYRPEyeUAAAAABJRU5ErkJggg==) no-repeat center;background-size:cover;margin-right:4px;transition:.2s}.arrow-transparent{visibility:hidden}.arrow-right{cursor:pointer}.arrow-bottom{transform:rotate(90deg);cursor:pointer}[draggable=true]{-khtml-user-drag:element}.drag-tree-table{position:relative;margin:20px 0;color:#606266;font-size:12px}.drag-tree-table.border{border:1px solid #eee;border-right:none}.drag-line{position:absolute;top:0;left:-1000px;height:100%;width:1px;background:#ccc}.drag-tree-table-header{display:flex;background:#f5f7fa;height:66px;line-height:36px;box-sizing:border-box;font-weight:600}.drag-tree-table-header .align-left{text-align:left}.drag-tree-table-header .align-right{text-align:right}.drag-tree-table-header .align-center{text-align:center}.drag-tree-table-header .tree-column{-webkit-user-select:none;user-select:none}.tree-icon-hidden{visibility:hidden}.is-draging .tree-row:hover{background:transparent!important}.tree-row{background-color:#409eff00;transition:background-color .5s linear}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { openBlock as u, createElementBlock as f, normalizeClass as w, normalizeStyle as S, renderSlot as v, Fragment as x, renderList as C, resolveComponent as p, createElementVNode as b, createBlock as I, withCtx as k, createVNode as M, withDirectives as T, withModifiers as z, vModelCheckbox as F, createCommentVNode as O, createTextVNode as H, toDisplayString as K, createSlots as R, vShow as E, createStaticVNode as P } from "vue";
const D = (t, s) => {
  const e = t.__vccOpts || t;
  for (const [n, o] of s)
    e[n] = o;
  return e;
}, V = {
  name: "column",
  props: {
    width: Number,
    field: String,
    label: String,
    flex: Number,
    border: String
  },
  data() {
    return {
      open: !1
    };
  },
  mounted() {
  }
}, G = ["isflex"];
function J(t, s, e, n, o, l) {
  return e.flex ? (u(), f("div", {
    key: 0,
    class: w(["tree-column", { border: e.border !== void 0 }]),
    isflex: !!e.flex,
    style: S({ width: e.width + "px", "min-width": e.width + "px", flex: e.flex })
  }, [
    v(t.$slots, "default")
  ], 14, G)) : (u(), f("div", {
    key: 1,
    class: w(["tree-column", { border: e.border !== void 0 }]),
    style: S({ width: e.width + "px" })
  }, [
    v(t.$slots, "default")
  ], 6));
}
const X = /* @__PURE__ */ D(V, [["render", J]]);
const U = {
  name: "space",
  props: ["depth"],
  computed: {
    spaces() {
      const t = [];
      for (let s = 0; s < this.depth; s++)
        t.push("");
      return t;
    }
  }
}, Z = { class: "space-container" };
function Q(t, s, e, n, o, l) {
  return u(), f("span", Z, [
    (u(!0), f(x, null, C(l.spaces, (i, r) => (u(), f("span", {
      class: "space",
      key: r
    }))), 128))
  ]);
}
const j = /* @__PURE__ */ D(U, [["render", Q]]);
const $ = {
  name: "row",
  props: ["model", "depth", "columns", "isdraggable", "border", "custom_field", "onCheck", "isContainChildren", "expandRowKeys"],
  inject: ["expandChange"],
  data() {
    return {
      open: !1,
      visibility: "visible"
    };
  },
  components: {
    column: X,
    space: j
  },
  computed: {
    isFolder() {
      return this.model[this.custom_field.lists] && this.model[this.custom_field.lists].length;
    },
    // expandRowKeys控制
    currentIsOpen() {
      var t, s;
      return (s = (t = this.expandRowKeys) == null ? void 0 : t.some) == null ? void 0 : s.call(t, (e) => e === this.model[this.custom_field.id]);
    }
  },
  methods: {
    toggle() {
      this.isFolder && (this.expandChange(this.model, !this.currentIsOpen), this.$forceUpdate());
    },
    dragstart(t) {
      navigator.userAgent.indexOf("Firefox") >= 0 && t.dataTransfer.setData("Text", this.id), window.dragId = t.target.children[0].getAttribute("tree-id"), window.dragPId = t.target.children[0].getAttribute("tree-p-id"), window.dragParentNode = t.target, t.target.style.opacity = 0.2;
    },
    dragend(t) {
      t.target.style.opacity = 1;
    },
    setAllCheckData(t, s) {
      const e = this.custom_field.lists;
      for (let o = 0; o < t.length; o++) {
        var n = t[o];
        this.$set(n, "checked", s), n[e] && n[e].length && this.setAllCheckData(n[e], s);
      }
    },
    onCheckboxClick(t, s) {
      s[this.custom_field.lists] && this.isContainChildren ? this.setAllCheckData([s], !!t.target.checked) : this.$set(s, "checked", !!t.target.checked), this.onCheck && this.onCheck();
    }
  }
}, ee = ["draggable"], te = ["data-level", "tree-id", "tree-p-id"], se = { key: 0 }, ne = {
  key: 1,
  class: "zip-icon arrow-transparent"
}, le = ["innerHTML"], ie = ["innerHTML"], oe = { key: 1 }, re = ["name"], de = { key: 2 }, ae = /* @__PURE__ */ P('<div class="hover-model" style="display:none;"><div class="hover-block prev-block"><i class="el-icon-caret-top"></i></div><div class="hover-block center-block"><i class="el-icon-caret-right"></i></div><div class="hover-block next-block"><i class="el-icon-caret-bottom"></i></div></div>', 1);
function ce(t, s, e, n, o, l) {
  const i = p("space"), r = p("column"), d = p("row", !0);
  return u(), f("div", {
    class: "tree-block",
    draggable: !!e.isdraggable,
    onDragstart: s[3] || (s[3] = (a) => l.dragstart(a)),
    onDragend: s[4] || (s[4] = (a) => l.dragend(a))
  }, [
    b("div", {
      class: w(["tree-row", { "highlight-row": e.model.highlight == !0 }]),
      "data-level": e.depth,
      "tree-id": e.model[e.custom_field.id],
      "tree-p-id": e.model[e.custom_field.parent_id],
      style: S({ backgroundColor: e.model.backgroundColor })
    }, [
      (u(!0), f(x, null, C(e.columns, (a, h) => (u(), I(r, {
        class: w(["align-" + a.align, "colIndex" + h]),
        field: a.field,
        width: a.width,
        flex: a.flex,
        border: e.border,
        key: h
      }, {
        default: k(() => [
          a.type === "selection" ? (u(), f("span", se, [
            M(i, { depth: e.depth }, null, 8, ["depth"]),
            e.model[e.custom_field.lists] && e.model[e.custom_field.lists].length ? (u(), f("span", {
              key: 0,
              onClick: s[0] || (s[0] = (...c) => l.toggle && l.toggle(...c)),
              class: w(["zip-icon", [l.currentIsOpen ? "arrow-bottom" : "arrow-right"]])
            }, null, 2)) : (u(), f("span", ne)),
            a.formatter ? (u(), f("span", {
              key: 2,
              innerHTML: a.formatter(e.model)
            }, null, 8, le)) : a.field ? (u(), f("span", {
              key: 3,
              innerHTML: e.model[a.field]
            }, null, 8, ie)) : v(t.$slots, "selection", {
              key: 4,
              row: e.model
            })
          ])) : a.type === "checkbox" ? (u(), f("span", oe, [
            e.model.isShowCheckbox !== !1 ? T((u(), f("input", {
              key: 0,
              type: "checkbox",
              name: e.model[e.custom_field.id],
              "onUpdate:modelValue": s[1] || (s[1] = (c) => e.model[e.custom_field.checked] = c),
              class: "checkbox action-item",
              onClick: s[2] || (s[2] = z((c) => l.onCheckboxClick(c, e.model), ["stop"]))
            }, null, 8, re)), [
              [F, e.model[e.custom_field.checked]]
            ]) : O("", !0)
          ])) : (u(), f("span", de, [
            v(t.$slots, a.field, { row: e.model }, () => [
              H(K(e.model[a.field]), 1)
            ])
          ]))
        ]),
        _: 2
      }, 1032, ["class", "field", "width", "flex", "border"]))), 128)),
      ae
    ], 14, te),
    l.isFolder ? (u(!0), f(x, { key: 0 }, C(e.model[e.custom_field.lists], (a, h) => T((u(), I(d, {
      model: a,
      columns: e.columns,
      key: h,
      isdraggable: e.isdraggable,
      border: e.border,
      depth: e.depth * 1 + 1,
      custom_field: e.custom_field,
      onCheck: e.onCheck,
      expandRowKeys: e.expandRowKeys,
      isContainChildren: e.isContainChildren
    }, R({
      selection: k(({ row: c }) => [
        v(t.$slots, "selection", { row: c })
      ]),
      _: 2
    }, [
      C(e.columns, (c, g) => ({
        name: c.field,
        fn: k(({ row: y }) => [
          v(t.$slots, c.field, { row: y }, () => [
            H(K(y[c.field]), 1)
          ])
        ])
      }))
    ]), 1032, ["model", "columns", "isdraggable", "border", "depth", "custom_field", "onCheck", "expandRowKeys", "isContainChildren"])), [
      [E, l.currentIsOpen]
    ])), 128)) : O("", !0)
  ], 40, ee);
}
const N = /* @__PURE__ */ D($, [["render", ce]]), m = {
  clearHoverStatus() {
    var t = document.querySelectorAll(".tree-row");
    for (let s = 0; s < t.length; s++) {
      const e = t[s], n = e.children[e.children.length - 1];
      n.style.display = "none", n.children[0].style.opacity = 0.1, n.children[1].style.opacity = 0.1, n.children[2].style.opacity = 0.1;
    }
  },
  getElementTop(t, s) {
    let e = s.querySelector(".drag-tree-table-body").scrollTop;
    for (var n = t.offsetTop - e, o = t.offsetParent; o !== null; )
      n += o.offsetTop, o = o.offsetParent;
    return n;
  },
  getElementLeft(t) {
    for (var s = t.offsetLeft, e = t.offsetParent; e !== null; )
      s += e.offsetLeft, e = e.offsetParent;
    return s;
  },
  deepClone(t) {
    if (!t)
      return t;
    var s, e, n;
    s = Array.isArray(t) ? [] : {};
    for (n in t)
      e = t[n], s[n] = typeof e == "object" ? m.deepClone(e) : e;
    return s;
  },
  clearHoverStatus() {
    var t = document.querySelectorAll(".tree-row");
    for (let s = 0; s < t.length; s++) {
      const e = t[s], n = e.children[e.children.length - 1];
      n.style.display = "none", n.children[0].style.opacity = 0.1, n.children[1].style.opacity = 0.1, n.children[2].style.opacity = 0.1;
    }
  }
};
document.body.ondrop = function(t) {
  t.preventDefault(), t.stopPropagation();
};
const he = {
  name: "dragTreeTable",
  components: {
    row: N,
    column: X
    // space
  },
  provide() {
    return {
      expandChange: (t, s) => {
        this.$emit("expandChange", t, s);
      }
    };
  },
  computed: {
    bodyStyle() {
      return {
        overflow: this.fixed !== void 0 && this.fixed !== !1 ? "auto" : "hidden"
        // height: (this.fixed !== undefined && this.fixed !== false) ? (this.height || 400) + 'px' : 'auto'
      };
    },
    custom_field() {
      return { ...this.default_custom_field, ...this.default_field };
    }
  },
  props: {
    isdraggable: {
      type: Boolean,
      default: !0
    },
    scrollNode: {
      type: null,
      default: () => window
    },
    data: Object,
    onDrag: {
      type: Function,
      default: () => {
      }
    },
    fixed: String,
    height: String,
    border: String,
    onlySameLevelCanDrag: String,
    hightRowChange: String,
    resize: String,
    beforeDragOver: Function,
    expandRowKeys: {
      type: Array,
      default: () => []
    },
    default_field: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dragX: 0,
      dragY: 0,
      dragId: "",
      targetId: "",
      whereInsert: "",
      isDraing: !1,
      onCheckChange: null,
      isContainChildren: !1,
      mouse: {
        status: 0,
        startX: 0,
        curColWidth: 0,
        curIndex: 0
      },
      default_custom_field: {
        id: "id",
        parent_id: "parent_id",
        order: "order",
        lists: "children",
        open: "open",
        checked: "checked",
        highlight: "highlight"
      }
    };
  },
  methods: {
    draging(t) {
      var e, n, o, l;
      if (t.preventDefault(), t.dataTransfer.dropEffect = "move", this.isDraing = !0, t.pageX == this.dragX && t.pageY == this.dragY)
        return;
      this.dragX = t.pageX, this.dragY = t.clientY, this.filter(t.pageX, t.clientY);
      let s = 0;
      t.clientY < 100 ? (s = scrollY - 6, (n = (e = this.scrollNode) == null ? void 0 : e.scrollTo) == null || n.call(e, 0, s), this.$emit("scroll", { x: 0, y: s })) : t.clientY > document.body.clientHeight - 160 && (s = scrollY + 6, (l = (o = this.scrollNode) == null ? void 0 : o.scrollTo) == null || l.call(o, 0, s), this.$emit("scroll", { x: 0, y: s }));
    },
    drop(t) {
      m.clearHoverStatus(), this.resetTreeData(), this.isDraing = !1, this.targetId !== void 0 && this.hightRowChange !== void 0 && this.$nextTick(() => {
        var s = document.querySelector(
          "[tree-id='" + window.dragId + "']"
        );
        s.style.backgroundColor = "rgba(64,158,255,0.5)", setTimeout(() => {
          s.style.backgroundColor = "rgba(64,158,255,0)";
        }, 2e3);
      });
    },
    // 查找匹配的行，处理拖拽样式
    filter(t, s) {
      var e = document.querySelectorAll(".tree-row");
      this.targetId = void 0;
      const n = window.dragParentNode.getBoundingClientRect(), o = n.left + window.dragParentNode.clientWidth, l = n.top + window.dragParentNode.clientHeight;
      if (t >= n.left && t <= o && s >= n.top && s <= l)
        return;
      let i = null, r = null, d = "";
      for (let h = 0; h < e.length; h++) {
        const c = e[h], g = c.getBoundingClientRect(), y = g.left, _ = g.top, W = c.clientWidth, Y = c.clientHeight;
        if (t > y && t < y + W && s > _ && s < _ + Y) {
          const L = s - _, q = c.getAttribute("tree-p-id");
          if (this.onlySameLevelCanDrag !== void 0 && q !== window.dragPId)
            return;
          r = c.getAttribute("tree-id"), i = c.children[c.children.length - 1];
          let B = c.offsetHeight;
          if (L / B > 3 / 4)
            d = "bottom";
          else if (L / B > 1 / 4) {
            if (this.onlySameLevelCanDrag !== void 0)
              return;
            d = "center";
          } else
            d = "top";
          break;
        }
      }
      if (r === void 0) {
        m.clearHoverStatus(), d = "";
        return;
      }
      let a = !0;
      if (this.beforeDragOver) {
        const h = this.getItemById(this.data.lists, window.dragId), c = this.getItemById(this.data.lists, r);
        a = this.beforeDragOver(h, c, d);
      }
      a == !1 || !i || (i.style.display = "block", N.offsetHeight, d == "bottom" ? i.children[2].style.opacity !== "0.5" && (m.clearHoverStatus(), i.children[2].style.opacity = 0.5) : d == "center" ? i.children[1].style.opacity !== "0.5" && (m.clearHoverStatus(), i.children[1].style.opacity = 0.5) : i.children[0].style.opacity !== "0.5" && (m.clearHoverStatus(), i.children[0].style.opacity = 0.5), this.targetId = r, this.whereInsert = d);
    },
    resetTreeData() {
      if (this.targetId === void 0)
        return;
      const t = this.custom_field.lists, s = this.custom_field.parent_id, e = this.custom_field.id, n = [], o = this.data.lists, l = this;
      let i = null, r = null;
      function d(h, c) {
        for (let y = 0; y < h.length; y++) {
          const _ = h[y];
          var g = m.deepClone(_);
          g[t] = [], l.targetId == _[e] ? (i = l.getItemById(l.data.lists, window.dragId), r = l.getItemById(l.data.lists, l.targetId), l.whereInsert === "top" ? (i[s] = _[s], c.push(i), c.push(g)) : l.whereInsert === "center" ? (i[s] = _[e], g[t].push(i), c.push(g)) : (i[s] = _[s], c.push(g), c.push(i))) : window.dragId != _[e] && c.push(g), _[t] && _[t].length && d(_[t], g[t]);
        }
      }
      d(o, n), this.resetOrder(n, i[this.custom_field.parent_id]);
      let a = l.getItemById(n, i[this.custom_field.parent_id]);
      this.onDrag(n, i, r, l.whereInsert, a), this.$emit("dragEnd", n, i, r, l.whereInsert, a);
    },
    // 重置所有数据的顺序order
    resetOrder(t, s) {
      const e = this.custom_field.lists;
      for (var n = 0; n < t.length; n++)
        t[n][this.custom_field.parent_id] == s ? t[n][this.custom_field.order] = n : t[n][e] && t[n][e].length && this.resetOrder(t[n][e], s);
    },
    // 根据id获取当前行
    getItemById(t, s) {
      var e = null;
      const n = this.custom_field.lists, o = this.custom_field.id;
      function l(i) {
        for (let d = 0; d < i.length; d++) {
          var r = i[d];
          if (r[o] == s) {
            e = JSON.parse(JSON.stringify(r));
            break;
          } else
            r[n] && r[n].length && l(r[n]);
        }
      }
      return l(t), e;
    },
    // 对外暴漏
    DelById(t) {
      const s = this.custom_field.lists, e = this.custom_field.order, n = this.custom_field.id, o = [], l = this.data.lists;
      function i(r, d) {
        let a = 0;
        for (let c = 0; c < r.length; c++) {
          const g = r[c];
          if (g[n] != t) {
            var h = m.deepClone(g);
            h[e] = a, h[s] = [], d.push(h), a++, g[s] && g[s].length && i(g[s], h[s]);
          }
        }
      }
      return i(l, o), o;
    },
    // 递归设置属性,只允许设置组件内置属性
    deepSetAttr(t, s, e, n) {
      const o = this.custom_field.lists;
      for (var l = 0; l < e.length; l++)
        n !== void 0 ? n.includes(e[l][this.custom_field.id]) && (e[l][this.custom_field[t]] = s) : e[l][this.custom_field[t]] = s, e[l][o] && e[l][o].length && this.deepSetAttr(t, s, e[l][o], n);
    },
    ZipAll(t, s = !0) {
      let e = m.deepClone(this.data.lists);
      this.deepSetAttr("open", !1, e), this.data.lists = e;
    },
    OpenAll(t, s = !0) {
      let e = m.deepClone(this.data.lists);
      this.deepSetAttr("open", !0, e), this.data.lists = e;
    },
    GetLevelById(t) {
      var s = this.$refs.table.querySelector('[tree-id="' + t + '"]'), e = s.getAttribute("data-level") * 1;
      return e;
    },
    HighlightRow(t, s = !0, e = !1) {
      let n = m.deepClone(this.data.lists), o = [t];
      e == !0 && (o = o.concat(this.GetChildIds(t, !0))), this.deepSetAttr("highlight", s, n, o), this.data.lists = n;
    },
    AddRow(t, s) {
      const e = m.deepClone(this.data.lists);
      var n = this;
      function o(l) {
        const i = n.custom_field.lists;
        for (var r = 0; r < l.length; r++) {
          if (l[r][n.custom_field.id] == t) {
            var d = Object.assign({}, s);
            d[n.custom_field.parent_id] = t, l[r][i] ? (d[n.custom_field.order] = l[r][i].length, l[r][i].push(d)) : (l[r][i] = [], d[n.custom_field.order] = 0, l[r][i].push(d));
          }
          l[r][i] && l[r][i].length && o(l[r][i]);
        }
      }
      o(e), this.data.lists = e;
    },
    EditRow(t, s) {
      const e = m.deepClone(this.data.lists);
      var n = this;
      function o(l) {
        const i = n.custom_field.lists;
        for (var r = 0; r < l.length; r++) {
          if (l[r][n.custom_field.id] == t) {
            var d = Object.assign({}, l[r], s);
            console.log(2222, d), l[r] = d;
          }
          l[r][i] && l[r][i].length && o(l[r][i]);
        }
      }
      o(e), console.log(e), this.data.lists = e;
    },
    GetChildIds(t, s = !0) {
      let e = [];
      const n = this;
      function o(l, i) {
        const r = n.custom_field.lists;
        for (var d = 0; d < l.length; d++) {
          let a = "", h = l[d][n.custom_field.parent_id];
          i == h ? (a = l[d][n.custom_field.id], e.push(a)) : a = i, (s == !0 || i == a) && l[d][r] && l[d][r].length && o(l[d][r], a);
        }
      }
      return o(this.data.lists, t), e;
    },
    // 全选按钮事件
    onCheckAll(t, s) {
      this.setAllCheckData(this.data.lists, !!t.target.checked);
      const e = this.getCheckedList(this.data.lists);
      s && s(e);
    },
    // 单个CheckBox勾选触发
    onSingleCheckChange() {
      const t = this.getCheckedList(this.data.lists);
      this.onCheckChange && this.onCheckChange(t);
    },
    // 根据flag批量处理数据
    setAllCheckData(t, s) {
      const e = this.custom_field.lists;
      for (let o = 0; o < t.length; o++) {
        var n = t[o];
        this.$set(n, "checked", s), n[e] && n[e].length && this.setAllCheckData(n[e], s);
      }
    },
    // 获取所有选中的行
    getCheckedList(t) {
      const s = this.custom_field.lists;
      var e = [];
      const n = m.deepClone(t);
      function o(l) {
        for (let r = 0; r < l.length; r++) {
          var i = l[r];
          i.checked && i.isShowCheckbox != !1 && e.push(i), i[s] && i[s].length && o(i[s]);
        }
      }
      return o(n), e;
    },
    mousedown(t, s) {
      const e = s.target.getBoundingClientRect().x, n = s.target.parentElement.offsetWidth;
      this.mouse = {
        status: 1,
        startX: e,
        curIndex: t,
        curColWidth: n
      };
    },
    mouseupHand(t) {
      if (this.mouse.status) {
        const e = t.clientX;
        var s = document.querySelector(".drag-line");
        s.style.left = "-10000px", this.mouse.status = 0;
        const n = this.mouse.curColWidth, o = e - this.mouse.startX, l = n + o, i = document.querySelectorAll(
          ".colIndex" + this.mouse.curIndex
        );
        for (let r = 0; r < i.length; r++) {
          const d = i[r];
          d.style.width = l + "px", d.getAttribute("isflex") && (d.style.minWidth = l + "px");
        }
        this.data.columns[this.mouse.curIndex].width = l;
      }
    },
    mousemoveHand(t) {
      if (this.mouse.status) {
        const e = t.clientX, n = document.querySelector(".drag-tree-table").getBoundingClientRect().left;
        var s = document.querySelector(".drag-line");
        s.style.left = e - n + "px";
      }
    }
  },
  mounted() {
    this.data.custom_field && (this.custom_field = Object.assign(
      {},
      this.custom_field,
      this.data.custom_field
    )), setTimeout(() => {
      this.data.columns.forEach((s) => {
        s.type == "checkbox" && (this.onCheckChange = s.onChange, this.isContainChildren = s.isContainChildren);
      });
    }, 100);
    let t = this;
    window.addEventListener("mouseup", t.mouseupHand), window.addEventListener("mousemove", t.mousemoveHand);
  },
  destroyed() {
    let t = this;
    window.removeEventListener("mouseup", t.mouseupHand), window.removeEventListener("mousemove", t.mousemoveHand);
  }
}, ue = { class: "drag-tree-table-header" }, fe = ["onClick"], ge = ["innerHTML"], me = ["onMousedown"], _e = /* @__PURE__ */ b("div", { class: "drag-line" }, null, -1);
function ye(t, s, e, n, o, l) {
  const i = p("column"), r = p("row");
  return u(), f("div", {
    class: w(["drag-tree-table", { border: e.border !== void 0 }]),
    ref: "table"
  }, [
    b("div", ue, [
      (u(!0), f(x, null, C(e.data.columns, (d, a) => (u(), I(i, {
        width: d.width,
        flex: d.flex,
        border: e.border === void 0 ? e.resize : e.border,
        class: w(["align-" + d.titleAlign, "colIndex" + a]),
        key: a
      }, {
        default: k(() => [
          d.type == "checkbox" ? (u(), f("input", {
            key: 0,
            class: "checkbox",
            type: "checkbox",
            onClick: (h) => l.onCheckAll(h, d.onChange)
          }, null, 8, fe)) : (u(), f("span", {
            key: 1,
            innerHTML: d.title
          }, null, 8, ge)),
          T(b("div", {
            class: "resize-line",
            onMousedown: (h) => l.mousedown(a, h)
          }, null, 40, me), [
            [E, e.resize !== void 0]
          ])
        ]),
        _: 2
      }, 1032, ["width", "flex", "border", "class"]))), 128))
    ]),
    b("div", {
      class: w(["drag-tree-table-body", o.isDraing ? "is-draging" : ""]),
      style: S(l.bodyStyle),
      onDragover: s[0] || (s[0] = (...d) => l.draging && l.draging(...d)),
      onDragend: s[1] || (s[1] = (...d) => l.drop && l.drop(...d))
    }, [
      (u(!0), f(x, null, C(e.data.lists, (d, a) => (u(), I(r, {
        depth: "0",
        columns: e.data.columns,
        isdraggable: e.isdraggable,
        model: d,
        custom_field: l.custom_field,
        onCheck: l.onSingleCheckChange,
        border: e.border === void 0 ? e.resize : e.border,
        isContainChildren: o.isContainChildren,
        expandRowKeys: e.expandRowKeys,
        key: a
      }, R({
        selection: k(({ row: h }) => [
          v(t.$slots, "selection", { row: h })
        ]),
        _: 2
      }, [
        C(e.data.columns, (h) => ({
          name: h.field,
          fn: k(({ row: c }) => [
            v(t.$slots, h.field, { row: c }, () => [
              H(K(c[h.field]), 1)
            ])
          ])
        }))
      ]), 1032, ["columns", "isdraggable", "model", "custom_field", "onCheck", "border", "isContainChildren", "expandRowKeys"]))), 128))
    ], 38),
    _e
  ], 2);
}
const A = /* @__PURE__ */ D(he, [["render", ye]]);
A.install = (t) => t.component(A.name, A);
export {
  A as default
};
