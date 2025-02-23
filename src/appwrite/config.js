import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);                 // Your project ID

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                })
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch (error) {

        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        }
        catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        }
        catch (err) {
            console.log("Appwrite service :: getPost :: error", err)
            return false;
        }

    }

    async getPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }
        catch (error) {
            console.log("Appwrite service :: getPosts :: error", error)
        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        }catch(error){
            console.log("Appwrite service :: uploadFile :: error", error)
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
            }
        catch(error){
            console.log("Appwrite service :: deleteFile :: error")
            return false;
        }

    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileID);

    }
}

const service = new Service();

export default service;