<template>
  <div class="row">
    <div class="col-12">
      <div class="post-write">
        <h1 class="post-write-title">
          {{ board[0]?.title }} 게시판 글쓰기
        </h1>
        <form @submit.prevent="write">
          <div class="post-title">
            <select v-model="category">
              <option value="default">카테고리 선택</option>
              <option
                  v-for="postCategory in board[0]?.postCategories"
                  :key="postCategory.postCategoryId"
                  :value="postCategory.postCategoryId"
              >
                {{ postCategory.topic }}
              </option>
            </select>
            <input type="text" placeholder="제목을 입력하세요." v-model="title">
          </div>
          <div class="post-content">
            <!-- tiptap editor start -->
            <div class="editor">
              <div class="editor-menu" v-if="editor">
                <button type="button" @click="editor.chain().focus().toggleBold().run()"
                        :class="{ 'is-active': editor.isActive('bold') }">
                  bold
                </button>
                <button type="button" @click="editor.chain().focus().toggleItalic().run()"
                        :class="{ 'is-active': editor.isActive('italic') }">
                  italic
                </button>
                <button type="button" @click="editor.chain().focus().toggleStrike().run()"
                        :class="{ 'is-active': editor.isActive('strike') }">
                  strike
                </button>
                <button type="button" @click="editor.chain().focus().toggleCode().run()"
                        :class="{ 'is-active': editor.isActive('code') }">
                  code
                </button>
                <button type="button" @click="editor.chain().focus().unsetAllMarks().run()">
                  clear marks
                </button>
                <button type="button" @click="editor.chain().focus().clearNodes().run()">
                  clear nodes
                </button>
                <button type="button" @click="editor.chain().focus().setParagraph().run()"
                        :class="{ 'is-active': editor.isActive('paragraph') }">
                  paragraph
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                  h1
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                  h2
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                  h3
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                  h4
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                  h5
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                  h6
                </button>
                <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
                        :class="{ 'is-active': editor.isActive('bulletList') }">
                  bullet list
                </button>
                <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
                        :class="{ 'is-active': editor.isActive('orderedList') }">
                  ordered list
                </button>
                <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()"
                        :class="{ 'is-active': editor.isActive('codeBlock') }">
                  code block
                </button>
                <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
                        :class="{ 'is-active': editor.isActive('blockquote') }">
                  blockquote
                </button>
                <button type="button" @click="editor.chain().focus().setHorizontalRule().run()">
                  horizontal rule
                </button>
                <button type="button" @click="editor.chain().focus().setHardBreak().run()">
                  hard break
                </button>
                <button type="button" @click="editor.chain().focus().undo().run()">
                  undo
                </button>
                <button type="button" @click="editor.chain().focus().redo().run()">
                  redo
                </button>
              </div>
              <editor-content class="editor-content" :editor="editor"/>
            </div>
            <!-- tiptap editor start -->
          </div>
          <div class="button-group">
            <button
                type="button"
                class="button-cancel"
                @click="cancel"
            >
              취소
            </button>
            <button type="submit" class="button-submit">작성완료</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, computed} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useEditor, EditorContent} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import router from "@/router";

export default {
  components: {
    EditorContent,
  },
  setup() {
    const store = useStore();
    const boardId = useRoute().params.boardId;
    const title = ref('');
    const category = ref('default');
    const editor = useEditor({
      content: "",
      extensions: [
        StarterKit,
      ],
    });

    const board = computed(() => store.state.postListMain.board);

    const write = async () => {
      if (!category.value || category.value === "default") {
        return alert("카테고리를 선택해주세요.");
      }

      await store.dispatch("postCreate/writePost", {
        boardId: boardId,
        categoryId: category.value,
        title: title.value,
        content: editor.value.getHTML(),
      });
    }

    const cancel = () => {
      return router.push(`/community/${boardId}`)
    }

    return {
      title,
      editor,
      board,
      category,
      write,
      cancel,
    }
  },
  created() {
    this.$store.dispatch('postListMain/getBoardWithPostCategories', {
      id: this.$route.params.boardId,
    });
  }
}
</script>

<style>
.post-write-title {
  font-size: 18px;
  padding: 8px 0;
}

.post-title {
  display: flex;
  padding: 8px 0;
}

.post-title select {
  margin-right: 8px;
}

.post-title input {
  width: 100%;
  border: #D3D3D3 solid 1px;
}

.post-content {
  padding: 8px 0;
}

.post-content textarea {
  width: 100%;
  height: 500px;
  border: #D3D3D3 solid 1px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.button-group button {
  border-radius: 8px;
  padding: 8px;
}

.button-group .button-submit {
  color: #FFFFFF;
  background-color: #8977AD;
}

/* tiptap css 설정 */

.ProseMirror {
  height: 400px;
}

.ProseMirror > * + * {
  margin-top: 0.75em;
}

.ProseMirror:focus {
  outline: none;
}

.ProseMirror ul, ol {
  padding: 0 1rem;
}

.ProseMirror ul {
  list-style-type: disc;
}

.ProseMirror ol {
  list-style-type: decimal;
}

.ProseMirror h1, h2, h3, h4, h5, h6 {
  line-height: 1.1;
}

.ProseMirror code {
  background-color: rgba(97, 97, 97, 0.1);
  color: #616161;
}

.ProseMirror pre {
  background: #0D0D0D;
  color: #FFF;
  font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.ProseMirror pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}

.ProseMirror img {
  max-width: 100%;
  height: auto;
}

.ProseMirror blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(13, 13, 13, 0.1);
}

.ProseMirror hr {
  border: none;
  border-top: 2px solid rgba(13, 13, 13, 0.1);
  margin: 2rem 0;
}

.editor {
  border: 1px solid #D3D3D3;
}

.editor-menu {
  border-bottom: 1px solid #D3D3D3;
}

.editor-content {
  height: 400px;
  overflow: auto;
}
</style>