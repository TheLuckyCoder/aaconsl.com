import React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Grid,
    Link,
    makeStyles,
    Typography
} from "@material-ui/core";
import Head from "next/head";
import NavBar from "../../components/NavBar";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    card: {
        minHeight: "100px",
        maxHeight: "200px"
    }
}));

export default function ExcelsList({list}) {
    const style = useStyles();

    return (<div>
        <Head>
            <title>Fișiere Excel</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {excel.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {excel.description.substring(0, 180) + "..."}
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
    const req = await fetch('http://localhost:9003/excel/');
    const data = await req.json();

    return {
        props: {list: data},
    }
}
