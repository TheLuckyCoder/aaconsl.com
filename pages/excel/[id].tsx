import React, {ReactElement, useState} from "react";
import {
    AspectRatio,
    Box,
    Button,
    Card,
    Container,
    Divider,
    Group,
    LoadingOverlay, Paper,
    Space,
    Stack,
    Text,
    Textarea,
    TextInput,
    Title,
    useMantineTheme
} from "@mantine/core";
import {ExcelProps} from "../../model/ExcelProps";
import {useForm} from "@mantine/form";
import {MdAlternateEmail, MdContactPage} from "react-icons/md";
import Head from "next/head";
import {getEmbedUrl, getThumbnailUrl, getVideoId} from "../../utils/youtube";

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

    const response = fetch("https://server.aaconsl.com/aaconsl/request", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
    })
        .then((res) => {
            return res.ok
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
        validateInputOnBlur: true,
    });

    return (
        <Box sx={{maxWidth: 600}} mx="auto">
            <Space h="xl"/>

            {requestState != FileRequestState.Success &&
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
                            icon={<MdContactPage size={14}/>}
                            required
                        />

                        <Space h="xs"/>

                        <TextInput
                            {...form.getInputProps('email')}
                            placeholder="mail@example.com"
                            label="Adresă Email"
                            icon={<MdAlternateEmail size={14}/>}
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
                <Paper shadow={"0"} p={"md"} sx={(theme) => ({
                    backgroundColor: theme.colors.green,
                    margin: theme.spacing.sm,
                })}>
                    <Text align={"center"} color="#FFF">Formularul a fost trimis, veți fi contactat pe email  cât de curând!</Text>
                </Paper>
            }

            {requestState == FileRequestState.Failed &&
                <Paper shadow={"0"} p={"md"} sx={(theme) => ({
                    backgroundColor: theme.colors.red,
                    margin: theme.spacing.sm,
                })}>
                    <Text align={"center"} color="#FFF">A apărut o eroare în trimiterea formularului, vă rugam să încercați din nou mai târziu
                        sau să ne contactați direct prin email la customfilepro@gmail.com dacă problema persistă</Text>
                </Paper>
            }

            <Space h="xl"/>
        </Box>
    )
}

export default function ExcelFile({excelProps}): ReactElement {
    const videoId = getVideoId(excelProps.youtubeUrl);

    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (<>
        <Head>
            <title>{excelProps.name}</title>
            <meta property="og:url" content={"https://aaconsl.com/excel/" + excelProps.id} key="og_url"/>
            <meta property="og:title" content={excelProps.name} key="og_title"/>
            <meta property="og:description" content={excelProps.description} key="og_description"/>
            <meta property="og:image" content={getThumbnailUrl(videoId)} key="og_image"/>
            <meta property="og:video" content={excelProps.youtubeUrl} key="og_video"/>
            <meta property="og:locale" content="ro_RO" key="og_lang"/>
            <meta property="og:site_name" content="A&A Consult" key="og_site_name"/>
        </Head>

        <Space h="xl"/>
        <Title align={"center"}>{excelProps.name}</Title>
        <Space h="xl"/>
        <Divider size="sm" variant="dashed"/>
        <Space h="xl"/>

        <Container px={0} fluid sx={(theme) => ({
            margin: theme.spacing.xl,
            '@media (max-width: 900px)': {
                margin: theme.spacing.sm,
            },
            '@media (max-width: 750px)': {
                margin: theme.spacing.xs,
            },
            '@media (max-width: 600px)': {
                margin: 0,
            }

        })}>
            <Card
                shadow="xl" p="xl" radius={0} withBorder>
                <Card.Section>
                    <AspectRatio ratio={16 / 9}>
                        <iframe id="ytplayer" width="100%" height="100%" src={getEmbedUrl(videoId)} frameBorder="0"></iframe>
                    </AspectRatio>
                </Card.Section>

                <Space h={"xl"}/>

                <Stack spacing="lg" style={{display: "flex", minHeight: 200}}>
                    <p className={'display-linebreak'} style={{color: secondaryColor, lineHeight: 1.6, fontSize: "18px"}}>
                        {excelProps.description}
                    </p>
                </Stack>
            </Card>
        </Container>

        <Space h="xl"/>

        <ContactForm {...excelProps} />
    </>)
}

export async function getStaticProps({params}) {
    const req = await fetch('https://server.aaconsl.com/aaconsl/excel/' + params.id);
    const data: ExcelProps = await req.json();

    return {
        props: {excelProps: data},
    }
}

export async function getStaticPaths() {
    const req = await fetch('https://server.aaconsl.com/aaconsl/excel');
    const data: ExcelProps[] = await req.json();

    data.sort((a, b) => new Date(a.date).getMilliseconds() - new Date(b.date).getMilliseconds())
    data.reverse()

    const paths = data.map(excelProps => {
        return {params: {id: excelProps.id.toString()}}
    })

    return {
        paths,
        fallback: false
    }
}
