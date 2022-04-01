import React, {useState} from "react";
import {Box, Button, Grid, Group, LoadingOverlay, Space, Text, Textarea, TextInput, Title} from "@mantine/core";
import {ExcelProps} from "../../model/ExcelProps";
import {useForm} from "@mantine/form";
import {AddressBook, At} from "tabler-icons-react";

const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/

enum FileRequestState {
    None,
    Loading,
    Success,
    Failed
}

async function sendContactRequest(fileId: number, {name, email, message}): Promise<boolean> {
    const body = {
        fileId, name, email, message
    }
    console.log(body)

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });

    const response = fetch("https://razvanrares.go.ro:4010/request", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
        // @ts-ignore
        agent: httpsAgent,
    })
        .then(() => {
            return true
        })
        .catch(() => {
            return false;
        })

    return await response
}

function ContactForm(excelProps: ExcelProps): JSX.Element {
    const [requestState, setRequestState] = useState(FileRequestState.None)

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

            {(requestState == FileRequestState.None || requestState == FileRequestState.Loading) &&
                <>
                    <Text>Dacă doriți acces la acest fișier vă rugăm să ne contactați folosind formularul de mai
                        jos:</Text>

                    <Space h="xs"/>

                    <form style={{position: 'relative'}} onSubmit={
                        form.onSubmit((values) => {
                            setRequestState(FileRequestState.Loading)
                            sendContactRequest(excelProps.id, values).then(ok => setRequestState(ok ? FileRequestState.Success : FileRequestState.Failed))
                        })}>

                        <TextInput
                            {...form.getInputProps('name')}
                            label="Nume"
                            placeholder="Numele și prenumele dumneavoastră"
                            minLength={8}
                            maxLength={30}
                            icon={<AddressBook size={14}/>}
                            required
                        />

                        <Space h="xs"/>

                        <TextInput
                            {...form.getInputProps('email')}
                            placeholder="mail@example.com"
                            label="Adresă Email"
                            icon={<At size={14}/>}
                            required
                        />

                        <Space h="xs"/>

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

                        <LoadingOverlay
                            visible={requestState == FileRequestState.Loading}
                            loaderProps={{color: 'green', variant: 'bars'}}/>

                        <Group position="right" mt="md">
                            <Button type="submit">Trimite</Button>
                        </Group>

                    </form>
                </>
            }

            {requestState == FileRequestState.Success &&
                <Text>Formularul a fost trimis și înregistrat cu succes!</Text>
            }

            {requestState == FileRequestState.Failed &&
                <Text color='red'>A aparut o eroare în procesarea formularului, vă rugam să încercați din nou mai târziu
                    sau să ne contactați prin Email dacă problema persistă</Text>
            }

            <Space h="xl"/>
        </Box>
    )
}

export default function Excel({excelProps}): JSX.Element {
    const link = excelProps.youtubeUrl.replace("https://www.youtube.com/watch?v=", "")
    console.log(link)

    return (<>
        <Title className={'text-center'}>{excelProps.name}</Title>

        <Grid justify="center" columns={2}>
            <Grid.Col
                xs={2}
                sm={2}
                md={2}
                lg={1}
            >
                <Text component="p" weight={3} className="display-linebreak">{excelProps.description}</Text>
            </Grid.Col>

            <Grid.Col
                xs={2}
                sm={2}
                md={2}
                lg={1}
            >
                <iframe id="ytplayer" type="text/html" width="640" height="360"
                        src={"https://www.youtube.com/embed/" + link + "?origin=https://aaconsl.com" }
                        frameBorder="0"></iframe>
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
