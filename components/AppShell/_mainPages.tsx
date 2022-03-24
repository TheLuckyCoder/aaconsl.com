import React from 'react';
import {FileSpreadsheet, Home, Mail} from 'tabler-icons-react';
import {Group, Text, ThemeIcon, UnstyledButton} from '@mantine/core';
import {useRouter} from "next/router";

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    link: string;
}

function MainLink({icon, color, label, link}: MainLinkProps) {
    const router = useRouter()

    return (
        <UnstyledButton
            onClick={() => router.push(link)}
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
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>

                <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>
    );
}

const data = [
    {icon: <Home size={16}/>, color: 'blue', label: 'Acasă', link: '/'},
    {icon: <FileSpreadsheet size={16}/>, color: 'teal', label: 'Excel', link: '/excel'},
    {icon: <Mail size={16}/>, color: 'orange', label: 'Contact', link: '/contact'},
];

export function MainLinks() {
    const links = data.map((link) => <MainLink {...link} key={link.label}/>);
    return <Group noWrap={true}>{links}</Group>;
}
