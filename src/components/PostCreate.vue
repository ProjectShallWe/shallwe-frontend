<template>
  <div class="row">
    <div class="col-12">
      <div class="post-write">
        <h1 class="post-write-title">
          {{ board[0]?.title }} 게시판 글쓰기
        </h1>
        <form
            @submit.prevent="write"
        >
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
                  <img src="../assets/tiptap/bold.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleItalic().run()"
                        :class="{ 'is-active': editor.isActive('italic') }">
                  <img src="../assets/tiptap/italic.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleStrike().run()"
                        :class="{ 'is-active': editor.isActive('strike') }">
                  <img src="../assets/tiptap/strikethrough.svg">
                </button>
                <button type="button" @click="clearMarksAndNodes(editor)">
                  <img src="../assets/tiptap/format-clear.svg">
                </button>
                <button type="button" @click="editor.chain().focus().setParagraph().run()"
                        :class="{ 'is-active': editor.isActive('paragraph') }">
                  <img src="../assets/tiptap/paragraph.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                  <img src="../assets/tiptap/h-1.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                  <img src="../assets/tiptap/h-2.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                  <img src="../assets/tiptap/h-3.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
                        :class="{ 'is-active': editor.isActive('bulletList') }">
                  <img src="../assets/tiptap/list-unordered.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
                        :class="{ 'is-active': editor.isActive('orderedList') }">
                  <img src="../assets/tiptap/list-ordered.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleCode().run()"
                        :class="{ 'is-active': editor.isActive('code') }">
                  <img src="../assets/tiptap/code-line.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()"
                        :class="{ 'is-active': editor.isActive('codeBlock') }">
                  <img src="../assets/tiptap/code-box-line.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
                        :class="{ 'is-active': editor.isActive('blockquote') }">
                  <img src="../assets/tiptap/double-quotes-l.svg">
                </button>
                <button type="button" @click="editor.chain().focus().setHorizontalRule().run()">
                  <img src="../assets/tiptap/separator.svg">
                </button>
                <button type="button" @click="editor.chain().focus().setHardBreak().run()">
                  <img src="../assets/tiptap/text-wrap.svg">
                </button>
                <button type="button" @click="editor.chain().focus().undo().run()">
                  <img src="../assets/tiptap/arrow-go-back-line.svg">
                </button>
                <button type="button" @click="editor.chain().focus().redo().run()">
                  <img src="../assets/tiptap/arrow-go-forward-line.svg">
                </button>
                <button type="button" @click="toggleImageModal">
                  <img src="../assets/tiptap/image-line.svg">
                </button>
                <button type="button" @click="setLink(editor)"
                        :class="{ 'is-active': editor.isActive('link') }">
                  <img src="../assets/tiptap/link.svg">
                </button>
              </div>
              <div v-if="imageModal">
                <div
                    class="image-url"
                >
                  <h3>URL</h3>
                  <input
                      v-model="url"
                      type="text"
                      placeholder="이미지의 URL을 입력해주세요"
                  >
                  <button
                      type="button"
                      @click="setImage(editor)"
                  >
                    확인
                  </button>
                </div>
                <div>
                  <div
                      class="image-upload"
                  >
                    <h3>upload</h3>
                    <input type="file" @change="onInputImage">
                    <button
                      type="button"
                      @click="uploadImage(editor)"
                    >
                     확인
                    </button>

                  </div>
                </div>
              </div>
              <div class="editor-content-wrap">
                <editor-content class="editor-content" :editor="editor"/>
              </div>
            </div>
            <!-- tiptap editor end -->
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
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {EditorContent, useEditor} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import router from "@/router";

export default {
  components: {
    EditorContent,
  },
  setup() {
    const store = useStore();
    const boardId = useRoute().params.boardId;
    const category = ref(useRoute().query.category);

    const title = ref("");

    const imageModal = ref(false);
    const url = ref('');

    const image = ref('');
    const imageUrl = computed(() => store.state.postCreate.imageUrl);

    const board = computed(() => store.state.postListMain.board);

    const editor = useEditor({
      content: "",
      extensions: [
        StarterKit,
        Image,
        Link,
      ],
    });

    const clearMarksAndNodes = (editor) => {
      editor.chain().focus().unsetAllMarks().run()
      editor.chain().focus().clearNodes().run()
    }

    const toggleImageModal = () => {
      imageModal.value = !imageModal.value;
    }

    const initModal = () => {
      imageModal.value = false;
      url.value = '';
    }

    const setImage = (editor) => {
      editor.chain().focus().setImage({src : url.value}).run();

      initModal();
    }

    const onInputImage = (e) => {
      image.value = e.target.files[0];
    }

    const uploadImage = async (editor) => {
      await store.dispatch("postCreate/uploadPostImage", {
        file: image.value
      })

      url.value = imageUrl.value

      editor.chain().focus().setImage({src: url.value}).run();

      initModal();
    }

    const setLink = (editor) => {
      const previousUrl = editor.getAttributes('link').href
      let linkUrl = window.prompt('URL', previousUrl)

      if (!linkUrl.match('^https?://')) {
        linkUrl = 'https://' + linkUrl;
      }

      console.log(linkUrl);

      // cancelled
      if (linkUrl === null) {
        return
      }

      // empty
      if (linkUrl === '') {
        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .unsetLink()
            .run()

        return
      }

      // update link
      editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: linkUrl })
          .run()
    }

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

    if (!category.value) {
      category.value = "default";
    }

    return {
      title,
      url,
      imageUrl,
      board,
      category,
      imageModal,
      clearMarksAndNodes,
      toggleImageModal,
      setImage,
      initModal,
      onInputImage,
      uploadImage,
      setLink,
      editor,
      write,
      cancel,
    }
  },
  created() {
    this.$store.dispatch('postListMain/getBoardWithPostCategories', {
      id: this.$route.params.boardId,
    });
  },
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

.ProseMirror h1, h2, h3 {
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

.ProseMirror a {
  color: #1a0dab;
}

.editor {
  border: 1px solid #D3D3D3;
}

.editor-menu {
  background-color: #F0F0F0;
  border-bottom: 1px solid #D3D3D3;
}

.editor-menu button {
  border-right: #D3D3D3 solid 1px;
}

.editor-menu button:last-child {
  border-style: none;
}

.image-url {
  display: flex;
  text-align: center;
  width: 100%;
  color: #F8F8F8;
  background-color: #8977AD;
  border: #8977AD solid 2px;
  border-radius: 8px;
}

.image-url h3 {
  width: 80px;
  font-size: 18px;
}

.image-url input {
  width: 100%;
}

.image-url button {
  width: 80px;
  font-size: 18px;
  background-color: #8977AD;
  color: #F8F8F8;
}

.editor-content {
  height: 400px;
  overflow: auto;
  padding: 16px 25px 0 25px;
}
</style>