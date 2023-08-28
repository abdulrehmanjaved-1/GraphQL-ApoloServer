import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';

async function init(){
    const app=express();
    const PORT=Number(process.env.PORT) || 9000;

    app.use(express.json());

    const gqlServer=new ApolloServer({
        typeDefs:`
            type Query {
                hello: String 
                doosra:Int  
                sayHello(name:String):String
            }
        `,
        resolvers:{
            Query: {
                hello: ()=> `Hey there I am a graphQL server`,
                doosra: ()=> 10,
                sayHello:(_,{name}:{name:String})=>`Hey ${name} how are you`
            }
        }
    })

    await gqlServer.start();

    app.get("/",(req,res)=>{
        res.json({message:"Server is up and running"})
    })

    app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(gqlServer));
    app.listen(PORT,()=> console.log(`Server started at port:${PORT} `))

}

init();