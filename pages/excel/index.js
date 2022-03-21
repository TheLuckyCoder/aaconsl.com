import React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../../components/NavBar";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    card: {
    },
    media: {
        height: "160px"
    }
}));

const youtubeLoader = ({ src }) => {
    return `https://img.youtube.com/vi/${src}/maxresdefault.jpg`
}

export default function ExcelsList({list}) {
    const style = useStyles();

    return (<div>
        <Head>
            <title>Fișiere Excel</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <main className={style.root}>
            <Grid container spacing={4}>
                {list.map((excel) => {
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={excel.id}
                        >
                            <Card>
                                <CardActionArea className={style.card} href={"excel/" + excel.id}>
                                   <CardMedia
                                        className={style.media}
                                        alt={"Thumbnail"}
                                        src={"https://img.youtube.com/vi/" + excel.youtubeUrl.replace("https://www.youtube.com/watch?v=", "") + "/maxresdefault.jpg"}/>

                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {excel.name}
                                        </Typography>
                                        <Typography gutterBottom variant="overline">
                                            {(new Date(excel.date)).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {excel.summary}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Button size="small">Citește mai mult</Button>
                                    </CardActions>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </main>

        <NavBar/>

    </div>);
}

export async function getStaticProps({}) {
    const req = await fetch('http://razvanrares.go.ro:4009/excel/');
    const data = await req.json();

    return {
        props: {list: data},
    }
}
