import conf from '../conf/conf.js';
import {Client, ID, Databases,Storage,Query} from 'appwrite';

export class Service{
  client= new Client();
  databases;
  bucket;

  constructor(){
    this.client
      .setEndpoint(conf.appwriteUrl) 
      .setProject(conf.appwriteProjectId);
    this.databases= new Databases(this.client);
    this.bucket= new Storage(this.client);
  }

  async createPost({title,slug,content,featuredImage,status,userId}){
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
        }
      )
    } catch (error) {
      console.log("Appwrite :: createPost :: error",error);  
    }
  }

  async updatePost(slug,{title,content,featuredImage,status}){
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
    } catch (error) {
      console.log("Appwrite :: updatePost :: error",error);  
    }
  }

  async deletePost(slug){
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true;
    } catch (error) {
      console.log("Appwrite :: deletePost :: error",error);
      return false;  
    }
  }

  async getPost(slug){
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
      )
    } catch (error) {
      console.log("Appwrite :: getPost :: error",error);  
      return false;
    }
  }
  
  async getPosts(queries=[Query.equal("status","active")]){
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      )
    } catch (error) {
      console.log("Appwrite :: getPosts :: error",error);  
      return false;
    }
  }
    
   //file upload services
  async uploadFlies(file){
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      )
    } catch (error) {
      console.log("Appwrite :: uploadFlie :: error",error);  
      return false;
    }
  }

  async deleteFile(fileID){
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileID,
      )
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteFile :: error",error);  
      return false;
      
    }
  }
      
  getFilePreview(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }

}

const service= new Service()
export default service