import {Box, Group, Space, Text, ThemeIcon, Tooltip, UnstyledButton} from "@mantine/core";
import React from "react";
import {useClipboard} from "@mantine/hooks";
import {Location, Mail, MapPin, Phone} from "tabler-icons-react";

interface ContactInfoProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    content: string;
}

function ContactInfoLabel(props: ContactInfoProps) {
    const clipboard = useClipboard({timeout: 500});

    return (
        <Tooltip
            radius="md"
            label={"Copiază: " + props.content}
            openDelay={250}
            withArrow
        >
            <UnstyledButton
                onClick={() => clipboard.copy(props.content)}
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
                    },
                })}
            >
                <Group noWrap={true}>
                    <ThemeIcon color={props.color} variant="light">
                        {props.icon}
                    </ThemeIcon>

                    <Text size="sm">{props.label + ': ' + props.content}</Text>
                </Group>
            </UnstyledButton>
        </Tooltip>
    );
}

const data: ContactInfoProps[] = [
    {icon: <Phone size={18}/>, color: 'pink', label: 'Telefon', content: '+40747297093'},
    {icon: <Mail size={18}/>, color: 'blue', label: 'Email', content: 'customfilepro@gmail.com'},
    {icon: <MapPin size={18}/>, color: 'red', label: 'Locație', content: 'Sibiu, Str. Calțun Nr. 15'}
];

function ContactInfoLabels() {
    const labels = data.map((label) => <ContactInfoLabel {...label} key={label.label}/>);
    return <Group direction="column" noWrap={true}>{labels}</Group>;
}

export default function Contact() {
    return (
        <Box sx={{maxWidth: 600}} mx="auto">
            <ContactInfoLabels/>

            <Space h="xl"/>

            <iframe width="600" height="450" loading="lazy" allowFullScreen
                    src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJje84s3lnTEcRjxhlSaAPMY0&key=AIzaSyDhyDBFfYNit3dLA9sfF1PWvt48T6jFpuc"></iframe>
        </Box>
    )
}
