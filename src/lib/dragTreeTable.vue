<template>
  <div
    class="drag-tree-table"
    ref="table"
    v-bind:class="{ border: border !== undefined }"
  >
    <div class="drag-tree-table-header">
      <column
        v-for="(item, index) in data.columns"
        :width="item.width"
        :flex="item.flex"
        :border="border === undefined ? resize : border"
        v-bind:class="['align-' + item.titleAlign, 'colIndex' + index]"
        :key="index"
      >
        <input
          v-if="item.type == 'checkbox'"
          class="checkbox"
          type="checkbox"
          @click="onCheckAll($event, item.onChange)"
        />
        <span v-else v-html="item.title"> </span>
        <div
          class="resize-line"
          @mousedown="mousedown(index, $event)"
          v-show="resize !== undefined"
        ></div>
      </column>
    </div>
    <div
      class="drag-tree-table-body"
      v-bind:style="bodyStyle"
      @dragover="draging"
      @dragend="drop"
      :class="isDraing ? 'is-draging' : ''"
    >
      <row
        depth="0"
        :columns="data.columns"
        :isdraggable="isdraggable"
        :model="item"
        v-for="(item, index) in data.lists"
        :custom_field="custom_field"
        :onCheck="onSingleCheckChange"
        :border="border === undefined ? resize : border"
        :isContainChildren="isContainChildren"
        :expandRowKeys="expandRowKeys"
        :key="index"
      >
        <template v-slot:selection="{ row }">
          <slot name="selection" v-bind:row="row"></slot>
        </template>
        <template
          v-for="subItem in data.columns"
          v-slot:[subItem.field]="{ row }"
        >
          <slot :name="subItem.field" v-bind:row="row">
            {{ row[subItem.field] }}
          </slot>
        </template>
      </row>
    </div>
    <div class="drag-line"></div>
  </div>
</template>

<script>
import row from "./row.vue";
import column from "./column.vue";
// import space from './space.vue';
import func from "./func";

document.body.ondrop = function (event) {
  event.preventDefault();
  event.stopPropagation();
};
export default {
  name: "dragTreeTable",
  components: {
    row,
    column,
    // space
  },
  provide() {
    return {
      expandChange: (row, open) => {
        this.$emit("expandChange", row, open);
      },
    };
  },
  computed: {
    bodyStyle() {
      return {
        overflow:
          this.fixed !== undefined && this.fixed !== false ? "auto" : "hidden",
        // height: (this.fixed !== undefined && this.fixed !== false) ? (this.height || 400) + 'px' : 'auto'
      };
    },
    custom_field() {
      return { ...this.default_custom_field, ...this.default_field };
    },
  },
  props: {
    isdraggable: {
      type: Boolean,
      default: true,
    },
    scrollNode:{
      type:null,
      default:()=>(window)
    },
    data: Object,
    onDrag: {
      type: Function,
      default: () => {},
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
      default: () => [],
    },
    default_field: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dragX: 0,
      dragY: 0,
      dragId: "",
      targetId: "",
      whereInsert: "",
      isDraing: false,
      onCheckChange: null,
      isContainChildren: false,
      mouse: {
        status: 0,
        startX: 0,
        curColWidth: 0,
        curIndex: 0,
      },
      default_custom_field: {
        id: "id",
        parent_id: "parent_id",
        order: "order",
        lists: "children",
        open: "open",
        checked: "checked",
        highlight: "highlight",
      },
    };
  },
  methods: {
    draging(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      this.isDraing = true;
      if (e.pageX == this.dragX && e.pageY == this.dragY) return;
      this.dragX = e.pageX;
      this.dragY = e.clientY;
      this.filter(e.pageX, e.clientY);
      let scrollEnd = 0
      if (e.clientY < 100) {
        scrollEnd = scrollY - 6
        this.scrollNode?.scrollTo?.(0, scrollEnd);
        this.$emit('scroll',{x:0,y: scrollEnd})
      } else if (e.clientY > document.body.clientHeight - 160) {
        scrollEnd =  scrollY + 6
        this.scrollNode?.scrollTo?.(0, scrollEnd);
        this.$emit('scroll',{x:0,y: scrollEnd})
      }
    },
    drop(event) {
      func.clearHoverStatus();
      this.resetTreeData();
      this.isDraing = false;
      if (this.targetId !== undefined) {
        if (this.hightRowChange !== undefined) {
          this.$nextTick(() => {
            var rowEle = document.querySelector(
              "[tree-id='" + window.dragId + "']"
            );
            rowEle.style.backgroundColor = "rgba(64,158,255,0.5)";
            setTimeout(() => {
              rowEle.style.backgroundColor = "rgba(64,158,255,0)";
            }, 2000);
          });
        }
      }
    },
    // 查找匹配的行，处理拖拽样式
    filter(x, y) {
      var rows = document.querySelectorAll(".tree-row");
      this.targetId = undefined;
      const dragRect = window.dragParentNode.getBoundingClientRect();
      const dragW = dragRect.left + window.dragParentNode.clientWidth;
      const dragH = dragRect.top + window.dragParentNode.clientHeight;
      if (x >= dragRect.left && x <= dragW && y >= dragRect.top && y <= dragH) {
        // 当前正在拖拽原始块不允许插入
        return;
      }
      let hoverBlock = null;
      let targetId = null;
      let whereInsert = "";

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rect = row.getBoundingClientRect();
        const rx = rect.left;
        const ry = rect.top;
        const rw = row.clientWidth;
        const rh = row.clientHeight;
        if (x > rx && x < rx + rw && y > ry && y < ry + rh) {
          const diffY = y - ry;
          const pId = row.getAttribute("tree-p-id");
          // 不允许改变层级结构，只能改变上下顺序逻辑
          if (
            this.onlySameLevelCanDrag !== undefined &&
            pId !== window.dragPId
          ) {
            return;
          }
          targetId = row.getAttribute("tree-id");
          hoverBlock = row.children[row.children.length - 1];
          let rowHeight = row.offsetHeight;
          if (diffY / rowHeight > 3 / 4) {
            whereInsert = "bottom";
          } else if (diffY / rowHeight > 1 / 4) {
            if (this.onlySameLevelCanDrag !== undefined) {
              // 不允许改变层级结构，只能改变上下顺序逻辑
              return;
            }
            whereInsert = "center";
          } else {
            whereInsert = "top";
          }
          break;
        }
      }
      if (targetId === undefined) {
        // 匹配不到清空上一个状态
        func.clearHoverStatus();
        whereInsert = "";
        return;
      }

      let canDrag = true;
      if (this.beforeDragOver) {
        const curRow = this.getItemById(this.data.lists, window.dragId);
        const targetRow = this.getItemById(this.data.lists, targetId);
        canDrag = this.beforeDragOver(curRow, targetRow, whereInsert);
      }
      if (canDrag == false || !hoverBlock) return;
      hoverBlock.style.display = "block";
      let rowHeight = row.offsetHeight;
      if (whereInsert == "bottom") {
        if (hoverBlock.children[2].style.opacity !== "0.5") {
          func.clearHoverStatus();
          hoverBlock.children[2].style.opacity = 0.5;
        }
      } else if (whereInsert == "center") {
        if (hoverBlock.children[1].style.opacity !== "0.5") {
          func.clearHoverStatus();
          hoverBlock.children[1].style.opacity = 0.5;
        }
      } else {
        if (hoverBlock.children[0].style.opacity !== "0.5") {
          func.clearHoverStatus();
          hoverBlock.children[0].style.opacity = 0.5;
        }
      }

      this.targetId = targetId;
      this.whereInsert = whereInsert;
    },
    resetTreeData() {
      if (this.targetId === undefined) return;
      const listKey = this.custom_field.lists;
      const parentIdKey = this.custom_field.parent_id;
      const idKey = this.custom_field.id;
      const newList = [];
      const curList = this.data.lists;
      const _this = this;
      let curDragItem = null;
      let taggetItem = null;
      function pushData(curList, needPushList) {
        for (let i = 0; i < curList.length; i++) {
          const item = curList[i];
          var obj = func.deepClone(item);
          obj[listKey] = [];
          if (_this.targetId == item[idKey]) {
            curDragItem = _this.getItemById(_this.data.lists, window.dragId);
            taggetItem = _this.getItemById(_this.data.lists, _this.targetId);
            if (_this.whereInsert === "top") {
              curDragItem[parentIdKey] = item[parentIdKey];
              needPushList.push(curDragItem);
              needPushList.push(obj);
            } else if (_this.whereInsert === "center") {
              curDragItem[parentIdKey] = item[idKey];
              // obj.open = true;
              obj[listKey].push(curDragItem);
              needPushList.push(obj);
            } else {
              curDragItem[parentIdKey] = item[parentIdKey];
              needPushList.push(obj);
              needPushList.push(curDragItem);
            }
          } else {
            if (window.dragId != item[idKey]) {
              needPushList.push(obj);
            }
          }
          if (item[listKey] && item[listKey].length) {
            pushData(item[listKey], obj[listKey]);
          }
        }
      }
      pushData(curList, newList);
      this.resetOrder(newList,curDragItem[this.custom_field.parent_id]);
      let parent =  _this.getItemById(newList, curDragItem[this.custom_field.parent_id]);
      this.onDrag(newList,curDragItem,taggetItem,_this.whereInsert,parent);
      this.$emit( "dragEnd",newList,curDragItem,taggetItem,_this.whereInsert,parent );
    },
    // 重置所有数据的顺序order
    resetOrder(list,pid) {
      const listKey = this.custom_field.lists;
      for (var i = 0; i < list.length; i++) {
        if(list[i][this.custom_field.parent_id] == pid){
          list[i][this.custom_field.order] = i;
        }else if (list[i][listKey] && list[i][listKey].length) {
          this.resetOrder(list[i][listKey],pid);
        }
      }
    },
    // 根据id获取当前行
    getItemById(lists, id) {
      var curItem = null;
      const listKey = this.custom_field.lists;
      const idKey = this.custom_field.id;
      function getchild(curList) {
        for (let i = 0; i < curList.length; i++) {
          var item = curList[i];
          if (item[idKey] == id) {
            curItem = JSON.parse(JSON.stringify(item));
            break;
          } else if (item[listKey] && item[listKey].length) {
            getchild(item[listKey]);
          }
        }
      }
      getchild(lists);
      return curItem;
    },
    // 对外暴漏
    DelById(id) {
      const listKey = this.custom_field.lists;
      const orderKey = this.custom_field.order;
      const idKey = this.custom_field.id;
      const newList = [];
      const curList = this.data.lists;
      function pushData(curList, needPushList) {
        let order = 0;
        for (let i = 0; i < curList.length; i++) {
          const item = curList[i];
          if (item[idKey] != id) {
            var obj = func.deepClone(item);
            obj[orderKey] = order;
            obj[listKey] = [];
            needPushList.push(obj);
            order++;
            if (item[listKey] && item[listKey].length) {
              pushData(item[listKey], obj[listKey]);
            }
          }
        }
      }
      pushData(curList, newList);
      return newList;
    },
    // 递归设置属性,只允许设置组件内置属性
    deepSetAttr(key, val, list, ids) {
      const listKey = this.custom_field.lists;
      for (var i = 0; i < list.length; i++) {
        if (ids !== undefined) {
          if (ids.includes(list[i][this.custom_field.id])) {
            list[i][this.custom_field[key]] = val;
          }
        } else {
          list[i][this.custom_field[key]] = val;
        }
        if (list[i][listKey] && list[i][listKey].length) {
          this.deepSetAttr(key, val, list[i][listKey], ids);
        }
      }
    },
    ZipAll(id, deep = true) {
      let list = func.deepClone(this.data.lists);
      this.deepSetAttr("open", false, list);
      this.data.lists = list;
    },
    OpenAll(id, deep = true) {
      let list = func.deepClone(this.data.lists);
      this.deepSetAttr("open", true, list);
      this.data.lists = list;
    },
    GetLevelById(id) {
      var row = this.$refs.table.querySelector('[tree-id="' + id + '"]');
      var level = row.getAttribute("data-level") * 1;
      return level;
    },
    HighlightRow(id, isHighlight = true, deep = false) {
      let list = func.deepClone(this.data.lists);
      let ids = [id];
      if (deep == true) {
        ids = ids.concat(this.GetChildIds(id, true));
      }
      this.deepSetAttr("highlight", isHighlight, list, ids);
      this.data.lists = list;
    },
    AddRow(pId, data) {
      const deepList = func.deepClone(this.data.lists);
      var _this = this;
      function deep(list) {
        const listKey = _this.custom_field.lists;
        for (var i = 0; i < list.length; i++) {
          if (list[i][_this.custom_field.id] == pId) {
            // list[i][_this.custom_field['open']] = true;
            var newRow = Object.assign({}, data);
            newRow[_this.custom_field.parent_id] = pId;
            if (list[i][listKey]) {
              newRow[_this.custom_field.order] = list[i][listKey].length;
              list[i][listKey].push(newRow);
            } else {
              list[i][listKey] = [];
              newRow[_this.custom_field.order] = 0;
              list[i][listKey].push(newRow);
            }
          }
          if (list[i][listKey] && list[i][listKey].length) {
            deep(list[i][listKey]);
          }
        }
      }
      deep(deepList);
      this.data.lists = deepList;
    },
    EditRow(id, data) {
      const deepList = func.deepClone(this.data.lists);
      var _this = this;
      function deep(list) {
        const listKey = _this.custom_field.lists;
        for (var i = 0; i < list.length; i++) {
          if (list[i][_this.custom_field.id] == id) {
            var newRow = Object.assign({}, list[i], data);
            console.log(2222, newRow);
            list[i] = newRow;
          }
          if (list[i][listKey] && list[i][listKey].length) {
            deep(list[i][listKey]);
          }
        }
      }
      deep(deepList);
      console.log(deepList);
      this.data.lists = deepList;
    },
    GetChildIds(id, deep = true) {
      let ids = [];
      const _this = this;
      function getChilds(list, id) {
        const listKey = _this.custom_field.lists;
        for (var i = 0; i < list.length; i++) {
          let currentPid = "";
          let pid = list[i][_this.custom_field.parent_id];
          if (id == pid) {
            currentPid = list[i][_this.custom_field.id];
            ids.push(currentPid);
          } else {
            currentPid = id;
          }
          if (deep == true || id == currentPid) {
            if (list[i][listKey] && list[i][listKey].length) {
              getChilds(list[i][listKey], currentPid);
            }
          }
        }
      }
      getChilds(this.data.lists, id);
      return ids;
    },
    // 全选按钮事件
    onCheckAll(evt, func) {
      this.setAllCheckData(this.data.lists, !!evt.target.checked);
      const checkedList = this.getCheckedList(this.data.lists);
      func && func(checkedList);
    },
    // 单个CheckBox勾选触发
    onSingleCheckChange() {
      const checkedList = this.getCheckedList(this.data.lists);
      this.onCheckChange && this.onCheckChange(checkedList);
    },
    // 根据flag批量处理数据
    setAllCheckData(curList, flag) {
      const listKey = this.custom_field.lists;
      for (let i = 0; i < curList.length; i++) {
        var item = curList[i];
        this.$set(item, "checked", flag);
        if (item[listKey] && item[listKey].length) {
          this.setAllCheckData(item[listKey], flag);
        }
      }
    },
    // 获取所有选中的行
    getCheckedList(lists) {
      const listKey = this.custom_field.lists;
      var checkedList = [];
      const deepList = func.deepClone(lists);
      function getchild(curList) {
        for (let i = 0; i < curList.length; i++) {
          var item = curList[i];
          if (item.checked && item.isShowCheckbox != false) {
            checkedList.push(item);
          }
          if (item[listKey] && item[listKey].length) {
            getchild(item[listKey]);
          }
        }
      }
      getchild(deepList);
      return checkedList;
    },
    mousedown(curIndex, e) {
      const startX = e.target.getBoundingClientRect().x;
      const curColWidth = e.target.parentElement.offsetWidth;
      this.mouse = {
        status: 1,
        startX,
        curIndex,
        curColWidth,
      };
    },

    mouseupHand(e){
      if (this.mouse.status) {
        const curX = e.clientX;
        var line = document.querySelector(".drag-line");
        line.style.left = "-10000px";
        this.mouse.status = 0;
        const curWidth = this.mouse.curColWidth;
        const subWidth = curX - this.mouse.startX;
        const lastWidth = curWidth + subWidth;
        const cols = document.querySelectorAll(
          ".colIndex" + this.mouse.curIndex
        );
        for (let index = 0; index < cols.length; index++) {
          const element = cols[index];
          element.style.width = lastWidth + "px";
          if (element.getAttribute("isflex")) {
            element.style.minWidth = lastWidth + "px";
          }
        }
        // 更新数据源
        this.data.columns[this.mouse.curIndex].width = lastWidth;
      }
    },
    mousemoveHand(e){
      if (this.mouse.status) {
        const endX = e.clientX;
        const tableLeft = document
          .querySelector(".drag-tree-table")
          .getBoundingClientRect().left;
        var line = document.querySelector(".drag-line");
        line.style.left = endX - tableLeft + "px";
      }
    }
  },
  mounted() {
    if (this.data.custom_field) {
      this.custom_field = Object.assign(
        {},
        this.custom_field,
        this.data.custom_field
      );
    }
    setTimeout(() => {
      this.data.columns.forEach((item) => {
        if (item.type == "checkbox") {
          this.onCheckChange = item.onChange;
          this.isContainChildren = item.isContainChildren;
        }
      });
    }, 100);

    let _this = this
    window.addEventListener("mouseup", _this.mouseupHand);
    window.addEventListener("mousemove", _this.mousemoveHand);
  },
  destroyed() {
    let _this = this
    window.removeEventListener('mouseup', _this.mouseupHand)
    window.removeEventListener('mousemove', _this.mousemoveHand)
  },
};
</script>

<style lang="scss">
.drag-tree-table {
  position: relative;
  margin: 20px 0;
  color: #606266;
  font-size: 12px;
  &.border {
    border: 1px solid #eee;
    border-right: none;
  }
}
.drag-line {
  position: absolute;
  top: 0;
  left: -1000px;
  height: 100%;
  width: 1px;
  background: #ccc;
}
.drag-tree-table-header {
  display: flex;
  // padding: 15px 10px;
  background: #f5f7fa;
  height: 66px;
  line-height: 36px;
  box-sizing: border-box;
  font-weight: 600;
  .align-left {
    text-align: left;
  }
  .align-right {
    text-align: right;
  }
  .align-center {
    text-align: center;
  }
  .tree-column {
    user-select: none;
  }
}
.tree-icon-hidden {
  visibility: hidden;
}
.is-draging .tree-row:hover {
  background: transparent !important;
}
.tree-row {
  background-color: rgba(64, 158, 255, 0);
  transition: background-color 0.5s linear;
}
</style>
