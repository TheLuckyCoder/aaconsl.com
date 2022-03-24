import React, {useState} from "react";
import ReactPlayer from "react-player";
import {Box, Button, Grid, Group, Space, Text, Textarea, TextInput, Title} from "@mantine/core";
import {ExcelProps} from "../../model/ExcelProps";
import {useForm} from "@mantine/form";

const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function ContactForm(excelProps: ExcelProps) {
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },

        validate: {
            email: (value) => value.toLowerCase().match(REGEX_EMAIL) ? null : "Email invalid",
        },
    });

    return (
        <Box sx={{maxWidth: 600}} mx="auto">
            <Space h="xl"/>
            <Space h="xl"/>

            <Text>Dacă doriți acces la acest fișier vă rugăm să ne contactați folosind formularul de mai jos:</Text>

            <Space h="xs"/>

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    {...form.getInputProps('name')}
                    label="Nume"
                    placeholder="Numele și prenumele Dumneavoastră"
                    minLength={8}
                    maxLength={30}
                    required
                />

                <TextInput
                    {...form.getInputProps('email')}
                    placeholder="mail@example.com"
                    label="Adresă Email"
                    /*icon={<At size={14} />}*/
                    required
                />

                <Textarea
                    {...form.getInputProps('message')}
                    label="Mesaj"
                    placeholder="De ce doriți acest fișier"
                    autosize
                    minRows={2}
                    minLength={10}
                    maxLength={1000}
                    required
                />

                <Group position="right" mt="md">
                    <Button type="submit">Trimite</Button>
                </Group>
            </form>
        </Box>
    )
}

export default function Excel({excelProps}) {
    return (<>
        <Title className={'text-center'}>{excelProps.name}</Title>

        <Grid justify="center" columns={2} grow={true}>
            <Grid.Col
                xs={2}
                sm={2}
                md={2}
                lg={1}
            >
                <Text component="p" weight={3}>{excelProps.description}</Text>
            </Grid.Col>

            <Grid.Col
                xs={2}
                sm={2}
                md={1}
            >
                <ReactPlayer url={excelProps.youtubeUrl}/>
            </Grid.Col>
        </Grid>

        <ContactForm {...excelProps} />

    </>)
}

export async function getStaticProps({params}) {
    const req = await fetch('http://razvanrares.go.ro:4009/excel/' + params.id);
    const data: ExcelProps = await req.json();

    return {
        props: {excelProps: data},
    }
}

export async function getStaticPaths() {
    const req = await fetch('http://razvanrares.go.ro:4009/excel/');
    const data: ExcelProps[] = await req.json();

    const paths = data.map(excelProps => {
        return {params: {id: excelProps.id.toString()}}
    })

    return {
        paths,
        fallback: false
    }
}
