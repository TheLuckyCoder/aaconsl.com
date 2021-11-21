import React from "react";
import ReactPlayer from "react-player";
import NavBar from "../../components/NavBar";
import {Typography} from "@material-ui/core";
import * as https from "https";

export default function Excel({excel}) {
    return (<>
        <NavBar/>
        <main className={'header'}>
            <h1 className={'text-center'}>{excel.name}</h1>
            <Typography variant="body1" component="p">
                {excel.description}
            </Typography>
            <ReactPlayer url={excel.youtubeUrl}/>
        </main>
    </>)
}

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

export async function getStaticProps({params}) {
    const req = await fetch(
        'https://razvanrares.go.ro:4009/excel/' + params.id,
        {
            agent: httpsAgent
        }
    );
    const data = await req.json();

    return {
        props: {excel: data},
    }
}

export async function getStaticPaths() {
    const req = await fetch('https://razvanrares.go.ro:4009/excel/');
    const data = await req.json();

    const paths = data.map(excel => {
        return { params: { id: excel.id.toString() }}
    })

    return {
        paths,
        fallback: false
    }
}
