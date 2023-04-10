<template>
    <div class="issue-item" @click="toIssueDetailView()">
        <div class="author">
            <!-- 显示头像还没调，暂时都显示默认头像 -->
            <el-avatar class="user_avatar" :src="require('../../../assets/images/anonymous.jpg')" :key="this.user_avatar" />
            <div class="user_name">{{this.user_name}}</div>
        </div>
        <div class="previews">
            <div style="display: flex;">
                <div class="title">{{this.title}}</div>
                <div class="time">{{this.date}}</div>
            </div>
            <div class="content">{{this.abstract}}</div>
            <div class="subject-chapter">
                <div class="square-tag">{{ this.subject }}</div>
                <div class="square-tag">{{ this.chapter }}</div>
            </div>
        </div>
        <div class="tags">
            <li class="tag" v-for="tag in this.tags">{{tag}}</li>
        </div>
        <div class="interactions" v-if="this.user_type === 0">
            <div class="issue_like_count">
                <i style="margin-top: 5px" class="el-icon-star-on"></i>
                <span style="margin: 0px 0px 4px 5px">{{this.issue_like_count}}</span>
            </div>
            <div class="issue_comment_count">
                <i style="margin-top: 5px" class="el-icon-chat-line-square"></i>
                <span style="margin: 0px 0px 4px 5px">{{this.issue_comment_count}}</span>
            </div>
        </div>
        <div class="interactions" v-if="this.user_type === 1">
            <el-button type="warning" style="issue-button" @click.stop="answerIssue">认领回答</el-button>
            <el-button type="warning" style="issue-button" @click.stop="verifyIssue">认领复审</el-button>
        </div>
    </div>
</template>

<script>
import {Message} from 'element-ui'

export default {
    name: 'IssueItem',
    props: {
        user_type: {
            type: Number,
            default: 0
        },
        id: {
            type: String,
            default: "issue998244353"
        },
        title: {
            type: String,
            default: "(无标题)"
        },
        user_name: {
            type: String,
            default: "匿名用户"
        },
        user_avatar: {
            type: String,
            default: '../../../assets/images/anonymous.jpg'
        },
        abstract: {
            type: String,
            default: '这个人什么都没写...'
        },
        tags: {
            type: Array,
            default: () => []
        },
        subject: {
            type: String,
            default: '未定科目'
        },
        chapter: {
            type: String,
            default: '未定章节'
        },
        date: {
            type: String,
            default: '2022-09-01'
        },
        issue_like_count: {
            type: Number,
            default: 0
        },
        issue_comment_count: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            }
    },
    setup() {
    },
    methods: {
        /* async */ toIssueDetailView() {
            // TODO: call backend API
            Message({
                message: '点击问题',
                type: 'warning',
            })
            console.log("to issue detail");
        },
        answerIssue() {
            Message({
                message: '回答问题',
                type: 'success',
            })
        },
        verifyIssue() {
            Message({
                message: '复审问题',
                type: 'success',
            })
        }
    }
}
</script>

<style scoped>
.issue-item {
    display: flex;
    cursor: pointer;
    width: 80%;
    height: 140px;
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: 10%;
    transition: all 0.3s;

    border-style: solid;
    border-color: #666666;
    border-width: 2px;
    border-radius: 0.8ch;
}

.issue-item:hover {
    box-shadow: rgba(100, 100, 111, 0.8) 0px 7px 29px 0px;
}

.author {
    display: flex;
    flex-direction: column;
    padding-top: 13px;
    padding-left: 4%;
    width: 15%;
}

.previews {
    display: flex;
    flex-direction: column;
    padding-top: 18px;
    padding-left: 2%;
    width: 50%;
}
.tags {
    display:flex;
    flex-direction: column;
    margin-top: 3px;
    padding-top: 10px;
    margin-left: 3%;
    width: 12%;
}

.interactions {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-left: 2%;
    width: 15%;
}

.user_avatar {
    width: 80px;
    height: 80px;
    margin-top: 4%;
}

.user_name {
    padding-left: 10%;
    padding-top: 5%;
    color: #444444;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 0.8px;
}

.title {
    font-weight: 600;
    font-size: 22px;
    letter-spacing: 1.5px;
}

.content {
    padding-top: 12px;
    color: #888888;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 1px;
}

.subject-chapter {
    display: flex;
    height: 40px;
    margin-top: 12px;
}

.square-tag {
    width: 80px;
    height: 28px;
    margin-right: 20%;
    padding-top: 3px;
    padding-bottom: 3px;

    border-style: none;
    border-color: #ddb666;
    background-color: #ddb666;
    border-radius: 0.6ch;

    color: #ffffff;
    font-weight: 500;
    text-align: center;
}

.tag {
    width: 70px;
    height: 30px;
    margin-top: 5%;
    margin-right: 5%;
    padding-top: 3px;
    padding-bottom: 3px;

    border-style: none;
    border-color: #76a8dd;
    background-color: #76a8dd;
    border-radius: 1.6ch;

    color: #ffffff;
    font-weight: 500;
    text-align: center;
}

.time {
    margin-top: 3px;
    margin-left: auto;
    margin-right: 3%;
    color: #444444;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.8px;
}

.issue_like_count {
    display:flex;
    padding-top: 5px;
    font-weight: 500;
    font-size: 22px;
}

.issue_comment_count {
    display:flex;

    padding-top: 30px;
    font-weight: 500;
    font-size: 22px;
}

.el-button {
    margin-top: 10%;
    margin-bottom: 10%;
    margin-left: 0px;
    margin-right: 10%;
}

.el-button--medium {
    padding-left: 0%;
    padding-right: 0%;
    text-align: center;
    color: white;
}

li {
    list-style-type: none;
}
</style>
