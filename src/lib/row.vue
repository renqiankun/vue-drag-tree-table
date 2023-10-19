<template>
        <div class="tree-block" :draggable="!!isdraggable" @dragstart="dragstart($event)"
            @dragend="dragend($event)">
            <div class="tree-row"
               
                :data-level="depth"
                :tree-id="model[custom_field.id]"
                :tree-p-id="model[custom_field.parent_id]"
                :class="{'highlight-row': model.highlight == true}"
                v-bind:style="{backgroundColor: model.backgroundColor}"> 
                <column
                    v-for="(subItem, subIndex) in columns"
                    v-bind:class="['align-' + subItem.align, 'colIndex' + subIndex]"
                    :field="subItem.field"
                    :width="subItem.width"
                    :flex="subItem.flex"
                    :border="border"
                    :key="subIndex">
                    <span v-if="subItem.type === 'selection'">
                        <space :depth="depth"/>
                        <span  @click="toggle" v-if = "model[custom_field.lists] && model[custom_field.lists].length" class="zip-icon" v-bind:class="[currentIsOpen ? 'arrow-bottom' : 'arrow-right']">
                        </span>
                        <span v-else class="zip-icon arrow-transparent">
                        </span>
                        <span v-if="subItem.formatter" v-html="subItem.formatter(model)"></span>
                        <span v-else-if="subItem.field" v-html="model[subItem.field]"></span>
                        <slot v-else name="selection" v-bind:row="model"></slot>
                    </span>
                    <span v-else-if="subItem.type === 'checkbox'">
                      <input type="checkbox"
                        v-if="model.isShowCheckbox !== false"
                        :name="model[custom_field.id]"
                        v-model="model[custom_field.checked]"
                        class="checkbox action-item"
                        @click.stop="onCheckboxClick($event, model)"/>
                    </span>
                    <span v-else>
                        <slot :name="subItem.field" v-bind:row="model">
                            {{model[subItem.field]}}
                        </slot>
                    </span>
                </column>
                <div class="hover-model" style="display: none">
                    <div class="hover-block prev-block">
                        <i class="el-icon-caret-top"></i>
                    </div>
                    <div class="hover-block center-block">
                        <i class="el-icon-caret-right"></i>
                    </div>
                    <div class="hover-block next-block">
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                </div>
            </div>
            <row 
                v-show="currentIsOpen"
                v-for="(item, index) in model[custom_field.lists]" 
                :model="item"
                :columns="columns"
                :key="index" 
                :isdraggable="isdraggable"
                :border="border"
                :depth="depth * 1 + 1"
                :custom_field="custom_field"
                :onCheck="onCheck"
                :expandRowKeys="expandRowKeys"
                :isContainChildren="isContainChildren"
                v-if="isFolder">
                    <template v-slot:selection="{row}">
                    <slot name="selection" v-bind:row="row"></slot>
                    </template>
                    <template v-for="(subItem, subIndex) in columns"  v-slot:[subItem.field]="{row}">
                    <slot :name="subItem.field" v-bind:row="row">
                        {{ row[subItem.field] }}
                    </slot>
                    </template>
            </row>
        </div>
        
    </template>
    <script>
    import column from './column.vue'
    import space from './space.vue'
    export default {
      name: 'row',
        props: ['model','depth','columns','isdraggable','border', 'custom_field','onCheck','isContainChildren','expandRowKeys'],
        inject:['expandChange'],
        data() {
            return {
                open: false,
                visibility: 'visible'
            }
        },
        components: {
          column,
          space
        },
        computed: {
            isFolder() {
                return this.model[this.custom_field.lists] && this.model[this.custom_field.lists].length
            },
            // expandRowKeys控制
            currentIsOpen(){
                return this.expandRowKeys?.some?.(id=>{
                    console.log(id , this.model[this.custom_field.id])
                    return id === this.model[this.custom_field.id]
                })
            },
        },
        methods: {
            toggle() {
                if(this.isFolder) {
                    // this.model[this.custom_field.open] = !this.model[this.custom_field.open];
                    this.expandChange(this.model,!this.currentIsOpen)
                    this.$forceUpdate()
                }
            },
            dragstart(e) {
                if (navigator.userAgent.indexOf('Firefox') >= 0) {
                    // Firefox drag have a bug
                    e.dataTransfer.setData('Text', this.id);
                }
                window.dragId = e.target.children[0].getAttribute('tree-id');
                window.dragPId = e.target.children[0].getAttribute('tree-p-id');
                window.dragParentNode = e.target;
                e.target.style.opacity = 0.2
            },
            dragend(e) {
              e.target.style.opacity = 1;
            },
            setAllCheckData (curList, flag) {
              const listKey = this.custom_field.lists
              for( let i = 0; i < curList.length; i++) {
                var item = curList[i]
                this.$set(item, 'checked', flag)
                if (item[listKey] && item[listKey].length) {
                  this.setAllCheckData(item[listKey], flag)
                }
              }
            },
            onCheckboxClick(evt, model) {
              const list = model[this.custom_field.lists];
              // 判断是否有子节点，如有需递归处理
              if (list && this.isContainChildren) {
                this.setAllCheckData([model] || [], !!evt.target.checked)
              } else {
                this.$set(model, 'checked', !!evt.target.checked)
              }
              this.onCheck && this.onCheck()
            }
        }
    }
    </script>
  <style lang="scss">
    .tree-block{
      width: 100%;
      background: rgba(255,255,255,0.8)
    }
    .tree-row{
      position: relative;
      display: flex;
    //   padding: 10px 10px;
      border-bottom: 1px solid #eee;
      line-height: 32px;
      &:hover{
          background: #ecf5ff
      }
      &.highlight-row{
          background: #ffe88c;
      }
      .align-left{
          text-align: left;
      }
      .align-right{
          text-align: right;
      }
      .align-center{
          text-align: center;
      }
    }
    .hover-model{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.6);
    }
    .hover-block{
        display: flex;
        opacity: 0.1;
        transition: opacity 0.5s;
        justify-content: center;
        align-items: center;
        i{
            color: #FFF;
        }
    }
    .prev-block{
        height: 25%;
        background: #a0c8f7;
    }
    .center-block{
        height: 50%;
        background: #a0c8f7;
    }
    .next-block{
        height: 25%;
        background: #a0c8f7;
    }
    .action-item{
        color: #409eff;
        cursor: pointer;
        i{
            font-style: normal;
        }
    }
    .zip-icon{
        display: inline-block;
        width: 10px;
        height: 10px;
        vertical-align: middle;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAf0lEQVQ4T7XT0Q2AMAhF0dvNdALdSEdzBB3BDXQD85LGRNMCauS7nAKBxMdIhfwemIAtYpeAEeiANoLUgAGYI4gFqAMX8QAXiQBCNFDNRBVdIgpUkSfADjT3KqLACmg/XrWw5J+Li+VVYCZrMBbgJluA+tXA3Hv45ZgiR3i+OQBeSyYRPEyeUAAAAABJRU5ErkJggg==') no-repeat center;
        background-size: cover;
        margin-right: 4px;
        transition: 0.2s;

    }
    .arrow-transparent{
        visibility: hidden;
    }
    .arrow-right{
        cursor: pointer;
    }
    .arrow-bottom{
        transform: rotate(90deg);
        cursor: pointer;
    }
    [draggable=true] {
      -khtml-user-drag: element;
    }
    </style>
    