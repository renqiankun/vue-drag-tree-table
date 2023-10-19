(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".tree-column{position:relative;padding:12px;min-width:60px;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;box-sizing:border-box}.tree-column.border{border-right:1px solid #eee}.resize-line{position:absolute;top:0;right:-3px;width:6px;height:100%;cursor:col-resize}.space{display:inline-block;width:15px}.tree-block{width:100%;background:rgba(255,255,255,.8)}.tree-row{position:relative;display:flex;border-bottom:1px solid #eee;line-height:32px}.tree-row:hover{background:#ecf5ff}.tree-row.highlight-row{background:#ffe88c}.tree-row .align-left{text-align:left}.tree-row .align-right{text-align:right}.tree-row .align-center{text-align:center}.hover-model{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.6)}.hover-block{display:flex;opacity:.1;transition:opacity .5s;justify-content:center;align-items:center}.hover-block i{color:#fff}.prev-block{height:25%;background:#a0c8f7}.center-block{height:50%;background:#a0c8f7}.next-block{height:25%;background:#a0c8f7}.action-item{color:#409eff;cursor:pointer}.action-item i{font-style:normal}.zip-icon{display:inline-block;width:10px;height:10px;vertical-align:middle;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAf0lEQVQ4T7XT0Q2AMAhF0dvNdALdSEdzBB3BDXQD85LGRNMCauS7nAKBxMdIhfwemIAtYpeAEeiANoLUgAGYI4gFqAMX8QAXiQBCNFDNRBVdIgpUkSfADjT3KqLACmg/XrWw5J+Li+VVYCZrMBbgJluA+tXA3Hv45ZgiR3i+OQBeSyYRPEyeUAAAAABJRU5ErkJggg==) no-repeat center;background-size:cover;margin-right:4px;transition:.2s}.arrow-transparent{visibility:hidden}.arrow-right{cursor:pointer}.arrow-bottom{transform:rotate(90deg);cursor:pointer}[draggable=true]{-khtml-user-drag:element}.drag-tree-table{position:relative;margin:20px 0;color:#606266;font-size:12px}.drag-tree-table.border{border:1px solid #eee;border-right:none}.drag-line{position:absolute;top:0;left:-1000px;height:100%;width:1px;background:#ccc}.drag-tree-table-header{display:flex;background:#f5f7fa;height:66px;line-height:36px;box-sizing:border-box;font-weight:600}.drag-tree-table-header .align-left{text-align:left}.drag-tree-table-header .align-right{text-align:right}.drag-tree-table-header .align-center{text-align:center}.drag-tree-table-header .tree-column{-webkit-user-select:none;user-select:none}.tree-icon-hidden{visibility:hidden}.is-draging .tree-row:hover{background:transparent!important}.tree-row{background-color:#409eff00;transition:background-color .5s linear}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { openBlock as u, createElementBlock as f, normalizeClass as w, normalizeStyle as S, renderSlot as C, Fragment as x, renderList as k, resolveComponent as p, createElementVNode as b, createBlock as I, withCtx as v, createVNode as M, withDirectives as T, withModifiers as z, vModelCheckbox as F, createCommentVNode as O, createTextVNode as K, toDisplayString as H, createSlots as N, vShow as E, createStaticVNode as P } from "vue";
const D = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [l, o] of n)
    e[l] = o;
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
function J(t, n, e, l, o, s) {
  return e.flex ? (u(), f("div", {
    key: 0,
    class: w(["tree-column", { border: e.border !== void 0 }]),
    isflex: !!e.flex,
    style: S({ width: e.width + "px", "min-width": e.width + "px", flex: e.flex })
  }, [
    C(t.$slots, "default")
  ], 14, G)) : (u(), f("div", {
    key: 1,
    class: w(["tree-column", { border: e.border !== void 0 }]),
    style: S({ width: e.width + "px" })
  }, [
    C(t.$slots, "default")
  ], 6));
}
const X = /* @__PURE__ */ D(V, [["render", J]]);
const U = {
  name: "space",
  props: ["depth"],
  computed: {
    spaces() {
      const t = [];
      for (let n = 0; n < this.depth; n++)
        t.push("");
      return t;
    }
  }
}, Z = { class: "space-container" };
function Q(t, n, e, l, o, s) {
  return u(), f("span", Z, [
    (u(!0), f(x, null, k(s.spaces, (i, r) => (u(), f("span", {
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
      var t, n;
      return (n = (t = this.expandRowKeys) == null ? void 0 : t.some) == null ? void 0 : n.call(t, (e) => e === this.model[this.custom_field.id]);
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
    setAllCheckData(t, n) {
      const e = this.custom_field.lists;
      for (let o = 0; o < t.length; o++) {
        var l = t[o];
        this.$set(l, "checked", n), l[e] && l[e].length && this.setAllCheckData(l[e], n);
      }
    },
    onCheckboxClick(t, n) {
      n[this.custom_field.lists] && this.isContainChildren ? this.setAllCheckData([n], !!t.target.checked) : this.$set(n, "checked", !!t.target.checked), this.onCheck && this.onCheck();
    }
  }
}, ee = ["draggable"], te = ["data-level", "tree-id", "tree-p-id"], ne = { key: 0 }, se = {
  key: 1,
  class: "zip-icon arrow-transparent"
}, le = ["innerHTML"], ie = ["innerHTML"], re = { key: 1 }, de = ["name"], oe = { key: 2 }, ae = /* @__PURE__ */ P('<div class="hover-model" style="display:none;"><div class="hover-block prev-block"><i class="el-icon-caret-top"></i></div><div class="hover-block center-block"><i class="el-icon-caret-right"></i></div><div class="hover-block next-block"><i class="el-icon-caret-bottom"></i></div></div>', 1);
function ce(t, n, e, l, o, s) {
  const i = p("space"), r = p("column"), d = p("row", !0);
  return u(), f("div", {
    class: "tree-block",
    draggable: !!e.isdraggable,
    onDragstart: n[3] || (n[3] = (a) => s.dragstart(a)),
    onDragend: n[4] || (n[4] = (a) => s.dragend(a))
  }, [
    b("div", {
      class: w(["tree-row", { "highlight-row": e.model.highlight == !0 }]),
      "data-level": e.depth,
      "tree-id": e.model[e.custom_field.id],
      "tree-p-id": e.model[e.custom_field.parent_id],
      style: S({ backgroundColor: e.model.backgroundColor })
    }, [
      (u(!0), f(x, null, k(e.columns, (a, h) => (u(), I(r, {
        class: w(["align-" + a.align, "colIndex" + h]),
        field: a.field,
        width: a.width,
        flex: a.flex,
        border: e.border,
        key: h
      }, {
        default: v(() => [
          a.type === "selection" ? (u(), f("span", ne, [
            M(i, { depth: e.depth }, null, 8, ["depth"]),
            e.model[e.custom_field.lists] && e.model[e.custom_field.lists].length ? (u(), f("span", {
              key: 0,
              onClick: n[0] || (n[0] = (...c) => s.toggle && s.toggle(...c)),
              class: w(["zip-icon", [s.currentIsOpen ? "arrow-bottom" : "arrow-right"]])
            }, null, 2)) : (u(), f("span", se)),
            a.formatter ? (u(), f("span", {
              key: 2,
              innerHTML: a.formatter(e.model)
            }, null, 8, le)) : a.field ? (u(), f("span", {
              key: 3,
              innerHTML: e.model[a.field]
            }, null, 8, ie)) : C(t.$slots, "selection", {
              key: 4,
              row: e.model
            })
          ])) : a.type === "checkbox" ? (u(), f("span", re, [
            e.model.isShowCheckbox !== !1 ? T((u(), f("input", {
              key: 0,
              type: "checkbox",
              name: e.model[e.custom_field.id],
              "onUpdate:modelValue": n[1] || (n[1] = (c) => e.model[e.custom_field.checked] = c),
              class: "checkbox action-item",
              onClick: n[2] || (n[2] = z((c) => s.onCheckboxClick(c, e.model), ["stop"]))
            }, null, 8, de)), [
              [F, e.model[e.custom_field.checked]]
            ]) : O("", !0)
          ])) : (u(), f("span", oe, [
            C(t.$slots, a.field, { row: e.model }, () => [
              K(H(e.model[a.field]), 1)
            ])
          ]))
        ]),
        _: 2
      }, 1032, ["class", "field", "width", "flex", "border"]))), 128)),
      ae
    ], 14, te),
    s.isFolder ? (u(!0), f(x, { key: 0 }, k(e.model[e.custom_field.lists], (a, h) => T((u(), I(d, {
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
    }, N({
      selection: v(({ row: c }) => [
        C(t.$slots, "selection", { row: c })
      ]),
      _: 2
    }, [
      k(e.columns, (c, g) => ({
        name: c.field,
        fn: v(({ row: y }) => [
          C(t.$slots, c.field, { row: y }, () => [
            K(H(y[c.field]), 1)
          ])
        ])
      }))
    ]), 1032, ["model", "columns", "isdraggable", "border", "depth", "custom_field", "onCheck", "expandRowKeys", "isContainChildren"])), [
      [E, s.currentIsOpen]
    ])), 128)) : O("", !0)
  ], 40, ee);
}
const R = /* @__PURE__ */ D($, [["render", ce]]), m = {
  clearHoverStatus() {
    var t = document.querySelectorAll(".tree-row");
    for (let n = 0; n < t.length; n++) {
      const e = t[n], l = e.children[e.children.length - 1];
      l.style.display = "none", l.children[0].style.opacity = 0.1, l.children[1].style.opacity = 0.1, l.children[2].style.opacity = 0.1;
    }
  },
  getElementTop(t, n) {
    let e = n.querySelector(".drag-tree-table-body").scrollTop;
    for (var l = t.offsetTop - e, o = t.offsetParent; o !== null; )
      l += o.offsetTop, o = o.offsetParent;
    return l;
  },
  getElementLeft(t) {
    for (var n = t.offsetLeft, e = t.offsetParent; e !== null; )
      n += e.offsetLeft, e = e.offsetParent;
    return n;
  },
  deepClone(t) {
    if (!t)
      return t;
    var n, e, l;
    n = Array.isArray(t) ? [] : {};
    for (l in t)
      e = t[l], n[l] = typeof e == "object" ? m.deepClone(e) : e;
    return n;
  },
  clearHoverStatus() {
    var t = document.querySelectorAll(".tree-row");
    for (let n = 0; n < t.length; n++) {
      const e = t[n], l = e.children[e.children.length - 1];
      l.style.display = "none", l.children[0].style.opacity = 0.1, l.children[1].style.opacity = 0.1, l.children[2].style.opacity = 0.1;
    }
  }
};
document.body.ondrop = function(t) {
  t.preventDefault(), t.stopPropagation();
};
const he = {
  name: "dragTreeTable",
  components: {
    row: R,
    column: X
    // space
  },
  provide() {
    return {
      expandChange: (t, n) => {
        this.$emit("expandChange", t, n);
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
      var e, l;
      if (t.preventDefault(), t.dataTransfer.dropEffect = "move", this.isDraing = !0, t.pageX == this.dragX && t.pageY == this.dragY)
        return;
      this.dragX = t.pageX, this.dragY = t.clientY, this.filter(t.pageX, t.clientY);
      let n = 0;
      (t.clientY < 100 || t.clientY > document.body.clientHeight - 160) && (n = scrollY - 6), (l = (e = this.scrollNode) == null ? void 0 : e.scrollTo) == null || l.call(e, 0, n), this.$emit("scroll", { x: 0, y: n });
    },
    drop(t) {
      m.clearHoverStatus(), this.resetTreeData(), this.isDraing = !1, this.targetId !== void 0 && this.hightRowChange !== void 0 && this.$nextTick(() => {
        var n = document.querySelector(
          "[tree-id='" + window.dragId + "']"
        );
        n.style.backgroundColor = "rgba(64,158,255,0.5)", setTimeout(() => {
          n.style.backgroundColor = "rgba(64,158,255,0)";
        }, 2e3);
      });
    },
    // 查找匹配的行，处理拖拽样式
    filter(t, n) {
      var e = document.querySelectorAll(".tree-row");
      this.targetId = void 0;
      const l = window.dragParentNode.getBoundingClientRect(), o = l.left + window.dragParentNode.clientWidth, s = l.top + window.dragParentNode.clientHeight;
      if (t >= l.left && t <= o && n >= l.top && n <= s)
        return;
      let i = null, r = null, d = "";
      for (let h = 0; h < e.length; h++) {
        const c = e[h], g = c.getBoundingClientRect(), y = g.left, _ = g.top, W = c.clientWidth, Y = c.clientHeight;
        if (t > y && t < y + W && n > _ && n < _ + Y) {
          const L = n - _, q = c.getAttribute("tree-p-id");
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
      a == !1 || !i || (i.style.display = "block", R.offsetHeight, d == "bottom" ? i.children[2].style.opacity !== "0.5" && (m.clearHoverStatus(), i.children[2].style.opacity = 0.5) : d == "center" ? i.children[1].style.opacity !== "0.5" && (m.clearHoverStatus(), i.children[1].style.opacity = 0.5) : i.children[0].style.opacity !== "0.5" && (m.clearHoverStatus(), i.children[0].style.opacity = 0.5), this.targetId = r, this.whereInsert = d);
    },
    resetTreeData() {
      if (this.targetId === void 0)
        return;
      const t = this.custom_field.lists, n = this.custom_field.parent_id, e = this.custom_field.id, l = [], o = this.data.lists, s = this;
      let i = null, r = null;
      function d(h, c) {
        for (let y = 0; y < h.length; y++) {
          const _ = h[y];
          var g = m.deepClone(_);
          g[t] = [], s.targetId == _[e] ? (i = s.getItemById(s.data.lists, window.dragId), r = s.getItemById(s.data.lists, s.targetId), s.whereInsert === "top" ? (i[n] = _[n], c.push(i), c.push(g)) : s.whereInsert === "center" ? (i[n] = _[e], g[t].push(i), c.push(g)) : (i[n] = _[n], c.push(g), c.push(i))) : window.dragId != _[e] && c.push(g), _[t] && _[t].length && d(_[t], g[t]);
        }
      }
      d(o, l), this.resetOrder(l);
      let a = s.getItemById(l, i[this.custom_field.parent_id]);
      this.onDrag(l, i, r, s.whereInsert, a), this.$emit("dragEnd", l, i, r, s.whereInsert, a);
    },
    // 重置所有数据的顺序order
    resetOrder(t) {
      const n = this.custom_field.lists;
      for (var e = 0; e < t.length; e++)
        t[e][this.custom_field.order] = e, t[e][n] && t[e][n].length && this.resetOrder(t[e][n]);
    },
    // 根据id获取当前行
    getItemById(t, n) {
      var e = null;
      const l = this.custom_field.lists, o = this.custom_field.id;
      function s(i) {
        for (let d = 0; d < i.length; d++) {
          var r = i[d];
          if (r[o] == n) {
            e = JSON.parse(JSON.stringify(r));
            break;
          } else
            r[l] && r[l].length && s(r[l]);
        }
      }
      return s(t), e;
    },
    // 对外暴漏
    DelById(t) {
      const n = this.custom_field.lists, e = this.custom_field.order, l = this.custom_field.id, o = [], s = this.data.lists;
      function i(r, d) {
        let a = 0;
        for (let c = 0; c < r.length; c++) {
          const g = r[c];
          if (g[l] != t) {
            var h = m.deepClone(g);
            h[e] = a, h[n] = [], d.push(h), a++, g[n] && g[n].length && i(g[n], h[n]);
          }
        }
      }
      return i(s, o), o;
    },
    // 递归设置属性,只允许设置组件内置属性
    deepSetAttr(t, n, e, l) {
      const o = this.custom_field.lists;
      for (var s = 0; s < e.length; s++)
        l !== void 0 ? l.includes(e[s][this.custom_field.id]) && (e[s][this.custom_field[t]] = n) : e[s][this.custom_field[t]] = n, e[s][o] && e[s][o].length && this.deepSetAttr(t, n, e[s][o], l);
    },
    ZipAll(t, n = !0) {
      let e = m.deepClone(this.data.lists);
      this.deepSetAttr("open", !1, e), this.data.lists = e;
    },
    OpenAll(t, n = !0) {
      let e = m.deepClone(this.data.lists);
      this.deepSetAttr("open", !0, e), this.data.lists = e;
    },
    GetLevelById(t) {
      var n = this.$refs.table.querySelector('[tree-id="' + t + '"]'), e = n.getAttribute("data-level") * 1;
      return e;
    },
    HighlightRow(t, n = !0, e = !1) {
      let l = m.deepClone(this.data.lists), o = [t];
      e == !0 && (o = o.concat(this.GetChildIds(t, !0))), this.deepSetAttr("highlight", n, l, o), this.data.lists = l;
    },
    AddRow(t, n) {
      const e = m.deepClone(this.data.lists);
      var l = this;
      function o(s) {
        const i = l.custom_field.lists;
        for (var r = 0; r < s.length; r++) {
          if (s[r][l.custom_field.id] == t) {
            var d = Object.assign({}, n);
            d[l.custom_field.parent_id] = t, s[r][i] ? (d[l.custom_field.order] = s[r][i].length, s[r][i].push(d)) : (s[r][i] = [], d[l.custom_field.order] = 0, s[r][i].push(d));
          }
          s[r][i] && s[r][i].length && o(s[r][i]);
        }
      }
      o(e), this.data.lists = e;
    },
    EditRow(t, n) {
      const e = m.deepClone(this.data.lists);
      var l = this;
      function o(s) {
        const i = l.custom_field.lists;
        for (var r = 0; r < s.length; r++) {
          if (s[r][l.custom_field.id] == t) {
            var d = Object.assign({}, s[r], n);
            console.log(2222, d), s[r] = d;
          }
          s[r][i] && s[r][i].length && o(s[r][i]);
        }
      }
      o(e), console.log(e), this.data.lists = e;
    },
    GetChildIds(t, n = !0) {
      let e = [];
      const l = this;
      function o(s, i) {
        const r = l.custom_field.lists;
        for (var d = 0; d < s.length; d++) {
          let a = "", h = s[d][l.custom_field.parent_id];
          i == h ? (a = s[d][l.custom_field.id], e.push(a)) : a = i, (n == !0 || i == a) && s[d][r] && s[d][r].length && o(s[d][r], a);
        }
      }
      return o(this.data.lists, t), e;
    },
    // 全选按钮事件
    onCheckAll(t, n) {
      this.setAllCheckData(this.data.lists, !!t.target.checked);
      const e = this.getCheckedList(this.data.lists);
      n && n(e);
    },
    // 单个CheckBox勾选触发
    onSingleCheckChange() {
      const t = this.getCheckedList(this.data.lists);
      this.onCheckChange && this.onCheckChange(t);
    },
    // 根据flag批量处理数据
    setAllCheckData(t, n) {
      const e = this.custom_field.lists;
      for (let o = 0; o < t.length; o++) {
        var l = t[o];
        this.$set(l, "checked", n), l[e] && l[e].length && this.setAllCheckData(l[e], n);
      }
    },
    // 获取所有选中的行
    getCheckedList(t) {
      const n = this.custom_field.lists;
      var e = [];
      const l = m.deepClone(t);
      function o(s) {
        for (let r = 0; r < s.length; r++) {
          var i = s[r];
          i.checked && i.isShowCheckbox != !1 && e.push(i), i[n] && i[n].length && o(i[n]);
        }
      }
      return o(l), e;
    },
    mousedown(t, n) {
      const e = n.target.getBoundingClientRect().x, l = n.target.parentElement.offsetWidth;
      this.mouse = {
        status: 1,
        startX: e,
        curIndex: t,
        curColWidth: l
      };
    }
  },
  mounted() {
    this.data.custom_field && (this.custom_field = Object.assign(
      {},
      this.custom_field,
      this.data.custom_field
    )), setTimeout(() => {
      this.data.columns.forEach((t) => {
        t.type == "checkbox" && (this.onCheckChange = t.onChange, this.isContainChildren = t.isContainChildren);
      });
    }, 100), window.addEventListener("mouseup", (t) => {
      if (this.mouse.status) {
        const e = t.clientX;
        var n = document.querySelector(".drag-line");
        n.style.left = "-10000px", this.mouse.status = 0;
        const l = this.mouse.curColWidth, o = e - this.mouse.startX, s = l + o, i = document.querySelectorAll(
          ".colIndex" + this.mouse.curIndex
        );
        for (let r = 0; r < i.length; r++) {
          const d = i[r];
          d.style.width = s + "px", d.getAttribute("isflex") && (d.style.minWidth = s + "px");
        }
        this.data.columns[this.mouse.curIndex].width = s;
      }
    }), window.addEventListener("mousemove", (t) => {
      if (this.mouse.status) {
        const e = t.clientX, l = document.querySelector(".drag-tree-table").getBoundingClientRect().left;
        var n = document.querySelector(".drag-line");
        n.style.left = e - l + "px";
      }
    });
  }
}, ue = { class: "drag-tree-table-header" }, fe = ["onClick"], ge = ["innerHTML"], me = ["onMousedown"], _e = /* @__PURE__ */ b("div", { class: "drag-line" }, null, -1);
function ye(t, n, e, l, o, s) {
  const i = p("column"), r = p("row");
  return u(), f("div", {
    class: w(["drag-tree-table", { border: e.border !== void 0 }]),
    ref: "table"
  }, [
    b("div", ue, [
      (u(!0), f(x, null, k(e.data.columns, (d, a) => (u(), I(i, {
        width: d.width,
        flex: d.flex,
        border: e.border === void 0 ? e.resize : e.border,
        class: w(["align-" + d.titleAlign, "colIndex" + a]),
        key: a
      }, {
        default: v(() => [
          d.type == "checkbox" ? (u(), f("input", {
            key: 0,
            class: "checkbox",
            type: "checkbox",
            onClick: (h) => s.onCheckAll(h, d.onChange)
          }, null, 8, fe)) : (u(), f("span", {
            key: 1,
            innerHTML: d.title
          }, null, 8, ge)),
          T(b("div", {
            class: "resize-line",
            onMousedown: (h) => s.mousedown(a, h)
          }, null, 40, me), [
            [E, e.resize !== void 0]
          ])
        ]),
        _: 2
      }, 1032, ["width", "flex", "border", "class"]))), 128))
    ]),
    b("div", {
      class: w(["drag-tree-table-body", o.isDraing ? "is-draging" : ""]),
      style: S(s.bodyStyle),
      onDragover: n[0] || (n[0] = (...d) => s.draging && s.draging(...d)),
      onDragend: n[1] || (n[1] = (...d) => s.drop && s.drop(...d))
    }, [
      (u(!0), f(x, null, k(e.data.lists, (d, a) => (u(), I(r, {
        depth: "0",
        columns: e.data.columns,
        isdraggable: e.isdraggable,
        model: d,
        custom_field: s.custom_field,
        onCheck: s.onSingleCheckChange,
        border: e.border === void 0 ? e.resize : e.border,
        isContainChildren: o.isContainChildren,
        expandRowKeys: e.expandRowKeys,
        key: a
      }, N({
        selection: v(({ row: h }) => [
          C(t.$slots, "selection", { row: h })
        ]),
        _: 2
      }, [
        k(e.data.columns, (h) => ({
          name: h.field,
          fn: v(({ row: c }) => [
            C(t.$slots, h.field, { row: c }, () => [
              K(H(c[h.field]), 1)
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
