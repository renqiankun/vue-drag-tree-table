<template>
  <div id="app">
    <div id="container">
    <!-- <button @click="zipAll">全部折叠</button>
    <button @click="openAll">全部开</button> -->
    <button @click="highlight(true)">高亮行</button>
    <button @click="highlight(false)">取消高亮</button>
    <dragTreeTable
      ref="table"
      :data="treeData"
      @dragEnd="onTreeDataChange"
      @expandChange="expandChange"
      :expandRowKeys="expandRowKeys"
      resize
      fixed
      :isdraggable="true">
    <template #selection="{row}">
      {{ row.name }}
    </template>

    <!-- <template #id="{row}">
     <strong> {{ row.id }}</strong>
    </template> -->

    <template #action="{row}">
      <a class="action-item" @click.stop.prevent="add(row)">添加子节点</a>
      <a class="action-item" @click.stop.prevent="edit(row)">修改子节点</a>
      <a class="action-item" @click.stop.prevent="onDel(row)"><i>删除</i></a>
    </template>
    </dragTreeTable>
    </div>
  </div>
</template>

<script>
import dragTreeTable from "../lib/dragTreeTable.vue";
import demoDataList from './data';
export default {
  name: "app",
  data() {
    return {
      treeData: {
        columns: [],
        lists: []
      },
      expandRowKeys:[]
    };
  },
  components: {
    dragTreeTable,
  },
  methods: {
    expandChange(row,open){
      if (!open) {
          this.expandRowKeys = this.expandRowKeys.filter(item => {
            return item != row.id;
          });
        }else{
          this.expandRowKeys.push(row.id)
        }
    },
    onTreeDataChange(list) {
      console.log(list)
      this.treeData.lists = list;
    },
    onAdd(pId, data) {
      this.$refs.table.AddRow(pId, data)
    },
    onEdit(id, data) {
      this.$refs.table.EditRow(id, data)
    },
    openAll() {
      this.$refs.table.OpenAll();
    },
    zipAll() {
      this.$refs.table.ZipAll()
    },
    onDel(item) {
      const updatedLists = this.$refs.table.DelById(item.id)
      console.log("当前行的数据" , updatedLists);
      this.treeData.lists = updatedLists;
      alert('本地删除成功')
    },
    highlight(flag) {
      this.$refs.table.HighlightRow(383, flag, true);
    },
    add(row) {
      this.$refs.addDialog.show('add', row.id);
    },
    edit(row) {
      this.$refs.editDialog.show('edit', row);
    }
  },
  mounted() {
    var columns = [
      {
        type: "selection",
        title: "菜单名称",
        field: "name",
        width: 200,
        align: "left",
        titleAlign: "left",
      },
      {
        title: "ID",
        field: "id",
        align: "center"
      },
      {
        title: "链接",
        field: "uri",
        align: "center"
      },
      {
        title: "操作(使用slot自定义)",
        field: "action",
        flex: 1,
        align: "center",
      },
    ];
    this.treeData = {
      columns: columns,
      lists: demoDataList
    };
  }
};
</script>

<style lang="scss">

</style>
