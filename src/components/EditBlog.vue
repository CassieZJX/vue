<template>
    <div id="add-blog">
        <h2>编辑博客</h2>
        <form v-if='!submmited'>
            <label>博客标题</label>
            <input type="text" v-model='blog.title' required />
            <label>博客内容</label>
            <textarea v-model="blog.content"></textarea>
            <!-- 博客分类 -->
            <div id="checkboxes">
                <label>Vue.js</label>
                <input type="checkbox" value="Vue.js" v-model="blog.categories">
                <label>Node.js</label>
                <input type="checkbox" value="Node.js" v-model="blog.categories">
                <label>React.js</label>
                <input type="checkbox" value="React.js" v-model="blog.categories">
                <label>Angular4</label>
                <input type="checkbox" value="Angular4" v-model="blog.categories">
            </div>
            <label>作者：</label>
            <select v-model="blog.author">
                <option v-for='author in authors'>
                    {{author}}
                </option>
            </select>
            <button v-on:click.prevent="post">编辑博客</button>

        </form>
        <div v-if="submmited">
            <h3>添加博客成功</h3>
        </div>
        <div id="preview">
            <h3>博客总览</h3>
            <p>博客标题:{{blog.title}}</p>
            <p>博客内容</p>
            <p>{{blog.content}}</p>
            <p>博客分类</p>
            <ul>
                <li v-for="category in blog.categories">
                    {{category}}
                </li>
            </ul>
            <p>作者{{blog.author}}</p>
        </div>

    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "add-blog",
  data() {
    return {
      id: this.$route.params.id,
      blog: {},
      authors: ["Cassie", "Ruby", "Ron"],
      submmited: false
    };
  },
  methods: {
    //编辑博客前把全部数据都加载好，方便用户编辑少量需要更改的地方
    fetchData() {
      console.log(this.id);
      // this.$http
      axios
        .get("/posts/" + this.id + ".json")
        .then(responce => {
          this.blog=responce.data;
          // console.log(responce)
        });
    },
    post: function() {
      // this.$http
      axios
        .put("/posts/" + this.id + ".json", this.blog)
        .then((data) =>{
          // console.log(data);
          this.submmited = true;
        });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
#add-blog * {
  box-sizing: border-box;
}
#add-blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}
label {
  display: block;
  margin: 20px 0 10px;
}
input[type="text"],
textarea,
select {
  display: block;
  width: 100%;
  padding: 8px;
}
textarea {
  height: 200px;
}
#checkboxes label {
  display: inline-block;
  margin-top: 0;
}
#checkboxes input {
  margin-right: 10px;
  display: inline-block;
}

button {
  display: block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  border: 0;
  padding: 14px;
  font-size: 18px;
  border-radius: 4px;
  cursor: pointer;
}
#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}
h3 {
  margin-top: 10px;
}
</style>
