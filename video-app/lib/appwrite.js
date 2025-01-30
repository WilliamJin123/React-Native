import { Client, Account, ID, Avatars, Databases} from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.auraclone',
    projectId: '679aed5c003583e289a6',
    databaseId: '679aee650005a7253207',
    userCollectionId: '679aee930038e8d4de8f',
    videoCollectionId: '679aeeac001d6aeddadc',
    storageId: '679aefe00007f99aa191'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
    

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

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
        throw new Error(err)
    }
}

