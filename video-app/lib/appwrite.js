
import { Client, Account, ID, Avatars, Databases, Query, Storage} from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.auraclone',
    projectId: '679aed5c003583e289a6',
    databaseId: '679aee650005a7253207',
    userCollectionId: '679aee930038e8d4de8f',
    videoCollectionId: '679aeeac001d6aeddadc',
    storageId: '679aefe00007f99aa191'
}

const {
    endpoint,
platform,
projectId,
databaseId,
userCollectionId,
videoCollectionId,
storageId,
} = appwriteConfig


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
    

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    try{
        const newAccount = await account.create(
            ID.unique(), email, password, username
        )
        if(!newAccount){
            throw Error;
        }
        const avatarURL = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarURL
            }
        )
        // console.log("New User Document:", newUser);
        return newUser;
    } catch(err){
        console.log(err)
        throw new Error(err)
    }
}

export async function signIn(email, password){
    try{
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    }catch(err){
        console.error("Login error:", err);
        throw err
    }
}

export async function getCurrentUser() {
    try{
        const currentAccount = await account.get()

        if(!currentAccount){
            throw Error;
        }
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        // console.log("Current User from DB:", currentUser);
        if(!currentUser){
            throw Error;
        }

        return currentUser.documents[0]
    }catch(err){
        console.log(err)
    }
}


export async function logoutUser() {
    try {
        await account.deleteSessions();
        console.log("All sessions cleared successfully!");
    } catch (err) {
        console.error("Error clearing sessions:", err);
    }
}


export const getAllPosts = async () => {
    try{
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents
    }catch(err){
        throw err;
    }
}

export const getLatestPosts = async () => {
    try{
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents
    }catch(err){
        throw err;
    }
}


export const searchPosts = async (query) => {
    try{
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents
    }catch(err){
        throw err;
    }
}

export const getUserPosts = async (userId) => {
    try{
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId)]
        )
        return posts.documents
    }catch(err){
        
        throw err;
    }
}

export const signOut = async () => {
    try{
        const session = await account.deleteSession('current')
        return session;
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl

    try{
        if(type==='video'){
            fileUrl = storage.getFileView(storageId, fileId)
        }else if (type==='image'){
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
        }else{
            throw new Error('Invalid file type')
        }
        if(!fileUrl) throw new Error

        return fileUrl
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

export const uploadFile = async (file, type) => {
    if(!file) return

    
   
    const asset = {
        name: file.fileName,
        type:file.mimeType,
        size: file.fileSize,
        uri:file.uri
    }

    try{
        
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        )
        console.log("Upload Success:", uploadedFile);
        const fileUrl = await getFilePreview(uploadedFile.$id, type)

        return fileUrl
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

export const createVideo = async (form) => {
    try{
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(
            databaseId, videoCollectionId, ID.unique(), {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )

        return newPost
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}