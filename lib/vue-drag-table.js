import { openBlock as u, createElementBlock as f, normalizeClass as C, normalizeStyle as x, renderSlot as y, Fragment as b, renderList as w, resolveComponent as v, createElementVNode as p, createBlock as S, withCtx as k, createVNode as M, withDirectives as T, withModifiers as z, vModelCheckbox as F, createCommentVNode as O, createTextVNode as K, toDisplayString as H, createSlots as N, vShow as X, createStaticVNode as P } from "vue";
const I = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [i, o] of n)
    e[i] = o;
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
function J(t, n, e, i, o, s) {
  return e.flex ? (u(), f("div", {
    key: 0,
    class: C(["tree-column", { border: e.border !== void 0 }]),
    isflex: !!e.flex,
    style: x({ width: e.width + "px", "min-width": e.width + "px", flex: e.flex })
  }, [
    y(t.$slots, "default")
  ], 14, G)) : (u(), f("div", {
    key: 1,
    class: C(["tree-column", { border: e.border !== void 0 }]),
    style: x({ width: e.width + "px" })
  }, [
    y(t.$slots, "default")
  ], 6));
}
const E = /* @__PURE__ */ I(V, [["render", J]]);
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
function Q(t, n, e, i, o, s) {
  return u(), f("span", Z, [
    (u(!0), f(b, null, w(s.spaces, (l, r) => (u(), f("span", {
      class: "space",
      key: r
    }))), 128))
  ]);
}
const j = /* @__PURE__ */ I(U, [["render", Q]]);
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
    column: E,
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
        var i = t[o];
        this.$set(i, "checked", n), i[e] && i[e].length && this.setAllCheckData(i[e], n);
      }
    },
    onCheckboxClick(t, n) {
      n[this.custom_field.lists] && this.isContainChildren ? this.setAllCheckData([n], !!t.target.checked) : this.$set(n, "checked", !!t.target.checked), this.onCheck && this.onCheck();
    }
  }
}, ee = ["draggable"], te = ["data-level", "tree-id", "tree-p-id"], ne = { key: 0 }, se = {
  key: 1,
  class: "zip-icon arrow-transparent"
}, ie = ["innerHTML"], le = ["innerHTML"], re = { key: 1 }, de = ["name"], oe = { key: 2 }, ae = /* @__PURE__ */ P('<div class="hover-model" style="display:none;"><div class="hover-block prev-block"><i class="el-icon-caret-top"></i></div><div class="hover-block center-block"><i class="el-icon-caret-right"></i></div><div class="hover-block next-block"><i class="el-icon-caret-bottom"></i></div></div>', 1);
function ce(t, n, e, i, o, s) {
  const l = v("space"), r = v("column"), d = v("row", !0);
  return u(), f("div", {
    class: "tree-block",
    draggable: !!e.isdraggable,
    onDragstart: n[3] || (n[3] = (a) => s.dragstart(a)),
    onDragend: n[4] || (n[4] = (a) => s.dragend(a))
  }, [
    p("div", {
      class: C(["tree-row", { "highlight-row": e.model.highlight == !0 }]),
      "data-level": e.depth,
      "tree-id": e.model[e.custom_field.id],
      "tree-p-id": e.model[e.custom_field.parent_id],
      style: x({ backgroundColor: e.model.backgroundColor })
    }, [
      (u(!0), f(b, null, w(e.columns, (a, h) => (u(), S(r, {
        class: C(["align-" + a.align, "colIndex" + h]),
        field: a.field,
        width: a.width,
        flex: a.flex,
        border: e.border,
        key: h
      }, {
        default: k(() => [
          a.type === "selection" ? (u(), f("span", ne, [
            M(l, { depth: e.depth }, null, 8, ["depth"]),
            e.model[e.custom_field.lists] && e.model[e.custom_field.lists].length ? (u(), f("span", {
              key: 0,
              onClick: n[0] || (n[0] = (...c) => s.toggle && s.toggle(...c)),
              class: C(["zip-icon", [s.currentIsOpen ? "arrow-bottom" : "arrow-right"]])
            }, null, 2)) : (u(), f("span", se)),
            a.formatter ? (u(), f("span", {
              key: 2,
              innerHTML: a.formatter(e.model)
            }, null, 8, ie)) : a.field ? (u(), f("span", {
              key: 3,
              innerHTML: e.model[a.field]
            }, null, 8, le)) : y(t.$slots, "selection", {
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
            y(t.$slots, a.field, { row: e.model }, () => [
              K(H(e.model[a.field]), 1)
            ])
          ]))
        ]),
        _: 2
      }, 1032, ["class", "field", "width", "flex", "border"]))), 128)),
      ae
    ], 14, te),
    s.isFolder ? (u(!0), f(b, { key: 0 }, w(e.model[e.custom_field.lists], (a, h) => T((u(), S(d, {
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
      selection: k(({ row: c }) => [
        y(t.$slots, "selection", { row: c })
      ]),
      _: 2
    }, [
      w(e.columns, (c, _) => ({
        name: c.field,
        fn: k(({ row: g }) => [
          y(t.$slots, c.field, { row: g }, () => [
            K(H(g[c.field]), 1)
          ])
        ])
      }))
    ]), 1032, ["model", "columns", "isdraggable", "border", "depth", "custom_field", "onCheck", "expandRowKeys", "isContainChildren"])), [
      [X, s.currentIsOpen]
    ])), 128)) : O("", !0)
  ], 40, ee);
}
const R = /* @__PURE__ */ I($, [["render", ce]]), m = {
  clearHoverStatus() {
    var t = document.querySelectorAll(".tree-row");
    for (let n = 0; n < t.length; n++) {
      const e = t[n], i = e.children[e.children.length - 1];
      i.style.display = "none", i.children[0].style.opacity = 0.1, i.children[1].style.opacity = 0.1, i.children[2].style.opacity = 0.1;
    }
  },
  getElementTop(t, n) {
    let e = n.querySelector(".drag-tree-table-body").scrollTop;
    for (var i = t.offsetTop - e, o = t.offsetParent; o !== null; )
      i += o.offsetTop, o = o.offsetParent;
    return i;
  },
  getElementLeft(t) {
    for (var n = t.offsetLeft, e = t.offsetParent; e !== null; )
      n += e.offsetLeft, e = e.offsetParent;
    return n;
  },
  deepClone(t) {
    if (!t)
      return t;
    var n, e, i;
    n = Array.isArray(t) ? [] : {};
    for (i in t)
      e = t[i], n[i] = typeof e == "object" ? m.deepClone(e) : e;
    return n;
  },
  clearHoverStatus() {
    var t = document.querySelectorAll(".tree-row");
    for (let n = 0; n < t.length; n++) {
      const e = t[n], i = e.children[e.children.length - 1];
      i.style.display = "none", i.children[0].style.opacity = 0.1, i.children[1].style.opacity = 0.1, i.children[2].style.opacity = 0.1;
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
    column: E
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
      t.preventDefault(), t.dataTransfer.dropEffect = "move", this.isDraing = !0, !(t.pageX == this.dragX && t.pageY == this.dragY) && (this.dragX = t.pageX, this.dragY = t.clientY, this.filter(t.pageX, t.clientY), t.clientY < 100 ? window.scrollTo(0, scrollY - 6) : t.clientY > document.body.clientHeight - 160 && window.scrollTo(0, scrollY + 6));
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
      const i = window.dragParentNode.getBoundingClientRect(), o = i.left + window.dragParentNode.clientWidth, s = i.top + window.dragParentNode.clientHeight;
      if (t >= i.left && t <= o && n >= i.top && n <= s)
        return;
      let l = null, r = null, d = "";
      for (let h = 0; h < e.length; h++) {
        const c = e[h], _ = c.getBoundingClientRect(), g = _.left, D = _.top, W = c.clientWidth, Y = c.clientHeight;
        if (t > g && t < g + W && n > D && n < D + Y) {
          const L = n - D, q = c.getAttribute("tree-p-id");
          if (this.onlySameLevelCanDrag !== void 0 && q !== window.dragPId)
            return;
          r = c.getAttribute("tree-id"), l = c.children[c.children.length - 1];
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
      a != !1 && (l.style.display = "block", R.offsetHeight, d == "bottom" ? l.children[2].style.opacity !== "0.5" && (m.clearHoverStatus(), l.children[2].style.opacity = 0.5) : d == "center" ? l.children[1].style.opacity !== "0.5" && (m.clearHoverStatus(), l.children[1].style.opacity = 0.5) : l.children[0].style.opacity !== "0.5" && (m.clearHoverStatus(), l.children[0].style.opacity = 0.5), this.targetId = r, this.whereInsert = d);
    },
    resetTreeData() {
      if (this.targetId === void 0)
        return;
      const t = this.custom_field.lists, n = this.custom_field.parent_id, e = this.custom_field.id, i = [], o = this.data.lists, s = this;
      let l = null, r = null;
      function d(a, h) {
        for (let _ = 0; _ < a.length; _++) {
          const g = a[_];
          var c = m.deepClone(g);
          c[t] = [], s.targetId == g[e] ? (l = s.getItemById(s.data.lists, window.dragId), r = s.getItemById(s.data.lists, s.targetId), s.whereInsert === "top" ? (l[n] = g[n], h.push(l), h.push(c)) : s.whereInsert === "center" ? (l[n] = g[e], c[t].push(l), h.push(c)) : (l[n] = g[n], h.push(c), h.push(l))) : window.dragId != g[e] && h.push(c), g[t] && g[t].length && d(g[t], c[t]);
        }
      }
      d(o, i), this.resetOrder(i), this.onDrag(i, l, r, s.whereInsert), this.$emit(
        "dragEnd",
        i,
        l,
        r,
        s.whereInsert
      );
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
      const i = this.custom_field.lists, o = this.custom_field.id;
      function s(l) {
        for (let d = 0; d < l.length; d++) {
          var r = l[d];
          if (r[o] == n) {
            e = JSON.parse(JSON.stringify(r));
            break;
          } else
            r[i] && r[i].length && s(r[i]);
        }
      }
      return s(t), e;
    },
    // 对外暴漏
    DelById(t) {
      const n = this.custom_field.lists, e = this.custom_field.order, i = this.custom_field.id, o = [], s = this.data.lists;
      function l(r, d) {
        let a = 0;
        for (let c = 0; c < r.length; c++) {
          const _ = r[c];
          if (_[i] != t) {
            var h = m.deepClone(_);
            h[e] = a, h[n] = [], d.push(h), a++, _[n] && _[n].length && l(_[n], h[n]);
          }
        }
      }
      return l(s, o), o;
    },
    // 递归设置属性,只允许设置组件内置属性
    deepSetAttr(t, n, e, i) {
      const o = this.custom_field.lists;
      for (var s = 0; s < e.length; s++)
        i !== void 0 ? i.includes(e[s][this.custom_field.id]) && (e[s][this.custom_field[t]] = n) : e[s][this.custom_field[t]] = n, e[s][o] && e[s][o].length && this.deepSetAttr(t, n, e[s][o], i);
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
      let i = m.deepClone(this.data.lists), o = [t];
      e == !0 && (o = o.concat(this.GetChildIds(t, !0))), this.deepSetAttr("highlight", n, i, o), this.data.lists = i;
    },
    AddRow(t, n) {
      const e = m.deepClone(this.data.lists);
      var i = this;
      function o(s) {
        const l = i.custom_field.lists;
        for (var r = 0; r < s.length; r++) {
          if (s[r][i.custom_field.id] == t) {
            var d = Object.assign({}, n);
            d[i.custom_field.parent_id] = t, s[r][l] ? (d[i.custom_field.order] = s[r][l].length, s[r][l].push(d)) : (s[r][l] = [], d[i.custom_field.order] = 0, s[r][l].push(d));
          }
          s[r][l] && s[r][l].length && o(s[r][l]);
        }
      }
      o(e), this.data.lists = e;
    },
    EditRow(t, n) {
      const e = m.deepClone(this.data.lists);
      var i = this;
      function o(s) {
        const l = i.custom_field.lists;
        for (var r = 0; r < s.length; r++) {
          if (s[r][i.custom_field.id] == t) {
            var d = Object.assign({}, s[r], n);
            console.log(2222, d), s[r] = d;
          }
          s[r][l] && s[r][l].length && o(s[r][l]);
        }
      }
      o(e), console.log(e), this.data.lists = e;
    },
    GetChildIds(t, n = !0) {
      let e = [];
      const i = this;
      function o(s, l) {
        const r = i.custom_field.lists;
        for (var d = 0; d < s.length; d++) {
          let a = "", h = s[d][i.custom_field.parent_id];
          l == h ? (a = s[d][i.custom_field.id], e.push(a)) : a = l, (n == !0 || l == a) && s[d][r] && s[d][r].length && o(s[d][r], a);
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
        var i = t[o];
        this.$set(i, "checked", n), i[e] && i[e].length && this.setAllCheckData(i[e], n);
      }
    },
    // 获取所有选中的行
    getCheckedList(t) {
      const n = this.custom_field.lists;
      var e = [];
      const i = m.deepClone(t);
      function o(s) {
        for (let r = 0; r < s.length; r++) {
          var l = s[r];
          l.checked && l.isShowCheckbox != !1 && e.push(l), l[n] && l[n].length && o(l[n]);
        }
      }
      return o(i), e;
    },
    mousedown(t, n) {
      const e = n.target.getBoundingClientRect().x, i = n.target.parentElement.offsetWidth;
      this.mouse = {
        status: 1,
        startX: e,
        curIndex: t,
        curColWidth: i
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
        const i = this.mouse.curColWidth, o = e - this.mouse.startX, s = i + o, l = document.querySelectorAll(
          ".colIndex" + this.mouse.curIndex
        );
        for (let r = 0; r < l.length; r++) {
          const d = l[r];
          d.style.width = s + "px", d.getAttribute("isflex") && (d.style.minWidth = s + "px");
        }
        this.data.columns[this.mouse.curIndex].width = s;
      }
    }), window.addEventListener("mousemove", (t) => {
      if (this.mouse.status) {
        const e = t.clientX, i = document.querySelector(".drag-tree-table").getBoundingClientRect().left;
        var n = document.querySelector(".drag-line");
        n.style.left = e - i + "px";
      }
    });
  }
}, ue = { class: "drag-tree-table-header" }, fe = ["onClick"], ge = ["innerHTML"], me = ["onMousedown"], _e = /* @__PURE__ */ p("div", { class: "drag-line" }, null, -1);
function ye(t, n, e, i, o, s) {
  const l = v("column"), r = v("row");
  return u(), f("div", {
    class: C(["drag-tree-table", { border: e.border !== void 0 }]),
    ref: "table"
  }, [
    p("div", ue, [
      (u(!0), f(b, null, w(e.data.columns, (d, a) => (u(), S(l, {
        width: d.width,
        flex: d.flex,
        border: e.border === void 0 ? e.resize : e.border,
        class: C(["align-" + d.titleAlign, "colIndex" + a]),
        key: a
      }, {
        default: k(() => [
          d.type == "checkbox" ? (u(), f("input", {
            key: 0,
            class: "checkbox",
            type: "checkbox",
            onClick: (h) => s.onCheckAll(h, d.onChange)
          }, null, 8, fe)) : (u(), f("span", {
            key: 1,
            innerHTML: d.title
          }, null, 8, ge)),
          T(p("div", {
            class: "resize-line",
            onMousedown: (h) => s.mousedown(a, h)
          }, null, 40, me), [
            [X, e.resize !== void 0]
          ])
        ]),
        _: 2
      }, 1032, ["width", "flex", "border", "class"]))), 128))
    ]),
    p("div", {
      class: C(["drag-tree-table-body", o.isDraing ? "is-draging" : ""]),
      style: x(s.bodyStyle),
      onDragover: n[0] || (n[0] = (...d) => s.draging && s.draging(...d)),
      onDragend: n[1] || (n[1] = (...d) => s.drop && s.drop(...d))
    }, [
      (u(!0), f(b, null, w(e.data.lists, (d, a) => (u(), S(r, {
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
        selection: k(({ row: h }) => [
          y(t.$slots, "selection", { row: h })
        ]),
        _: 2
      }, [
        w(e.data.columns, (h) => ({
          name: h.field,
          fn: k(({ row: c }) => [
            y(t.$slots, h.field, { row: c }, () => [
              K(H(c[h.field]), 1)
            ])
          ])
        }))
      ]), 1032, ["columns", "isdraggable", "model", "custom_field", "onCheck", "border", "isContainChildren", "expandRowKeys"]))), 128))
    ], 38),
    _e
  ], 2);
}
const A = /* @__PURE__ */ I(he, [["render", ye]]);
A.install = (t) => t.component(A.name, A);
export {
  A as default
};
