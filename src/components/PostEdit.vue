<template>
  <div class="row">
    <div class="col-12">
      <div class="post-write">
        <h1 class="post-write-title">
          {{ board[0]?.title }} 게시판 글쓰기
        </h1>
        <form @submit.prevent="write">
          <table class="post-title">
            <tbody>
            <tr>
              <td>
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
              </td>
              <td width="100%">
                <input type="text" placeholder="제목을 입력하세요." v-model="title">
              </td>
            </tr>
            </tbody>
          </table>
          <div class="post-content">
            <!-- tiptap editor start -->
            <div class="editor">
              <div class="editor-menu" v-if="editor">
                <button type="button" @click="editor.chain().focus().toggleBold().run()"
                        :class="{ 'is-active': editor.isActive('bold') }">
                  <img src="../assets/images/tiptap/bold.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleItalic().run()"
                        :class="{ 'is-active': editor.isActive('italic') }">
                  <img src="../assets/images/tiptap/italic.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleStrike().run()"
                        :class="{ 'is-active': editor.isActive('strike') }">
                  <img src="../assets/images/tiptap/strikethrough.svg">
                </button>
                <button type="button" @click="clearMarksAndNodes(editor)">
                  <img src="../assets/images/tiptap/format-clear.svg">
                </button>
                <button type="button" @click="editor.chain().focus().setParagraph().run()"
                        :class="{ 'is-active': editor.isActive('paragraph') }">
                  <img src="../assets/images/tiptap/paragraph.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                  <img src="../assets/images/tiptap/h-1.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                  <img src="../assets/images/tiptap/h-2.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                  <img src="../assets/images/tiptap/h-3.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
                        :class="{ 'is-active': editor.isActive('bulletList') }">
                  <img src="../assets/images/tiptap/list-unordered.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
                        :class="{ 'is-active': editor.isActive('orderedList') }">
                  <img src="../assets/images/tiptap/list-ordered.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleCode().run()"
                        :class="{ 'is-active': editor.isActive('code') }">
                  <img src="../assets/images/tiptap/code-line.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()"
                        :class="{ 'is-active': editor.isActive('codeBlock') }">
                  <img src="../assets/images/tiptap/code-box-line.svg">
                </button>
                <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
                        :class="{ 'is-active': editor.isActive('blockquote') }">
                  <img src="../assets/images/tiptap/double-quotes-l.svg">
                </button>
                <button type="button" @click="editor.chain().focus().setHorizontalRule().run()">
                  <img src="../assets/images/tiptap/separator.svg">
                </button>
                <button type="button" @click="editor.chain().focus().setHardBreak().run()">
                  <img src="../assets/images/tiptap/text-wrap.svg">
                </button>
                <button type="button" @click="editor.chain().focus().undo().run()">
                  <img src="../assets/images/tiptap/arrow-go-back-line.svg">
                </button>
                <button type="button" @click="editor.chain().focus().redo().run()">
                  <img src="../assets/images/tiptap/arrow-go-forward-line.svg">
                </button>
                <button type="button" @click="toggleImageModal">
                  <img src="../assets/images/tiptap/image-line.svg">
                </button>
                <button type="button" @click="setLink(editor)"
                        :class="{ 'is-active': editor.isActive('link') }">
                  <img src="../assets/images/tiptap/link.svg">
                </button>
              </div>
              <div class="image-wrapper" v-if="imageModal">
                <h2>이미지 삽입</h2>
                <div
                    class="image-url"
                >
                  <h3>이미지 주소</h3>
                  <div class="image-content">
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
                </div>
                <div>
                  <div
                      class="image-upload"
                  >
                    <h3>이미지 파일</h3>
                    <div class="image-content">
                      <input type="file"
                             accept="image/png, image/gif, image/jpg, image/jpeg, image/bmp"
                             @change="onInputImage"
                      >
                      <button
                          type="button"
                          @click="uploadImage(editor)"
                      >
                        확인
                      </button>
                    </div>
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
    const route = useRoute();

    const boardId = route.params.boardId;
    const category = ref(route.query.category);
    const postId = route.query.postId;
    const mode = route.query.mode;

    const board = computed(() => store.state.postListMain.board);
    const postDetail = computed(() => store.state.postDetail.postDetail);

    const title = ref(mode === "update" ? postDetail.value.title : "");
    const content = ref(mode ==="update" ? postDetail.value.content: "");

    const imageModal = ref(false);
    const url = ref('');

    const image = ref('');
    const imageUrl = computed(() => store.state.postEdit.imageUrl);

    const editor = useEditor({
      content: content.value,
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
      editor.chain().focus().setImage({src: url.value}).run();

      initModal();
    }

    const onInputImage = (e) => {
      image.value = e.target.files[0];
    }

    const uploadImage = async (editor) => {
      await store.dispatch("postEdit/uploadPostImage", {
        file: image.value
      })

      url.value = imageUrl.value

      editor.chain().focus().setImage({src: url.value}).run();

      image.value = '';

      initModal();
    }

    const setLink = (editor) => {
      const previousUrl = editor.getAttributes('link').href
      let linkUrl = window.prompt('URL', previousUrl)

      if (!linkUrl.match('^https?://')) {
        linkUrl = 'https://' + linkUrl;
      }

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
          .setLink({href: linkUrl})
          .run()
    }

    const write = async () => {
      if (!category.value || category.value === "default") {
        return alert("카테고리를 선택해주세요.");
      }

      // 어떤 이미지가 수정되고 삭제되었는지 알기 위해
      // 작성한 글에 포함된 이미지들의 URL리스트를 백엔드에 넘긴다.
      const imageUrls = [];
      const words = editor.value.getHTML()
          .split('"')
          .map(e => e.trim());
      const targetImageUrl = "https://shallwe.s3"
      for (let w = 0; w < words.length; w++) {
        if (words[w].includes(targetImageUrl)) {
          imageUrls.push(words[w]);
        }
      }

      if (mode !== "update") {
        await store.dispatch("postEdit/writePost", {
          boardId: boardId,
          categoryId: category.value,
          title: title.value,
          content: editor.value.getHTML(),
          images : imageUrls,
        });
      }

      if (mode === "update") {
        await store.dispatch("postEdit/updatePost", {
          postId: postId,
          boardId: boardId,
          categoryId: category.value,
          title: title.value,
          content: editor.value.getHTML(),
          images : imageUrls,
        });
      }
    }

    const cancel = () => {
      return router.push(`/community/${boardId}`)
    }

    if (!category.value) {
      category.value = "default";
    }

    return {
      postId,
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
      mode,
    }
  },
  created() {
    this.$store.dispatch('postListMain/getBoardWithPostCategories', {
      id: this.$route.params.boardId,
    });
  },
}
</script>

<style lang="scss">

.post-write {
  .post-write-title {
    font-size: 18px;
    padding: 8px 0;
  }

  form {
    .post-title {
      display: table;

      tbody {
        tr {
          td select {
            margin-right: 8px;
          }

          td input {
            width: 100%;
            border: $TERTIARY_COLOR solid 1px;

            &:focus {
              border: $SECONDARY_COLOR solid 1px;
            }
          }
        }
      }
    }
  }

  .post-content {
    padding: 8px 0;
  }
}


.button-group {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;

  button {
    width: 80px;
    height: 40px;
    border-radius: 8px;
    padding: 8px;
    border: $TERTIARY_COLOR solid 1px;

    &:hover {
      color: $PRIMARY_COLOR;
      background-color: $SECONDARY_COLOR
    }
  }
}

/* tiptap css 설정 */
.ProseMirror {
  height: 400px;

  * + * {
    margin-top: 0.75em;
  }

  &:focus {
    outline: none;
  }

  ul, ol {
    padding: 0 1rem;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  h1, h2, h3 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(97, 97, 97, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(13, 13, 13, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(13, 13, 13, 0.1);
    margin: 2rem 0;
  }

  a {
    color: #1a0dab;
  }
}

.editor {
  border: 1px solid $TERTIARY_COLOR;

  .editor-menu {
    background-color: $PRIMARY_COLOR;
    border-bottom: 1px solid $TERTIARY_COLOR;

    button {
      border-right: $TERTIARY_COLOR solid 1px;
      padding: 4px;

      &:last-child {
        border-style: none;
      }

      &:hover {
        background-color: $TERTIARY_COLOR;
      }
    }

    .is-active {
      background-color: $TERTIARY_COLOR;
    }
  }

  .editor-content {
    height: 400px;
    overflow: auto;
    padding: 16px 25px 0 25px;
  }

  .image-wrapper {
    position: absolute;
    background-color: $PRIMARY_COLOR;
    border: $TERTIARY_COLOR solid 1px;
    z-index: 999;

    h2 {
      font-size: 20px;
      padding: 8px;
      border-bottom: $TERTIARY_COLOR solid 1px;
    }

    .image-url,
    .image-upload {
      display: flex;
      align-items: center;
      text-align: center;
      width: 100%;
      padding: 8px;

      h3 {
        font-size: 16px;
        margin-right: 8px;
      }

      .image-content {
        input {
          padding: 4px;
          border: $TERTIARY_COLOR solid 1px;
          margin-right: 8px;

          &:focus {
            border: $SECONDARY_COLOR solid 1px;
          }
        }

        button {
          width: 60px;
          font-size: 16px;
          border-radius: 8px;
          border: $TERTIARY_COLOR solid 1px;

          &:hover {
            color: $PRIMARY_COLOR;
            background-color: $SECONDARY_COLOR;
          }
        }
      }
    }

    .image-url {
      border-bottom: $TERTIARY_COLOR solid 1px;
    }
  }
}
</style>