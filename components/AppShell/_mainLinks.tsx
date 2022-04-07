import React from 'react';
import {MdFilePresent, MdHome, MdMail} from 'react-icons/md';
import {Group, Text, ThemeIcon, UnstyledButton} from '@mantine/core';
import {useRouter} from "next/router";
import styles from './MyAppShell.module.css'

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
                height: '70px',
                padding: theme.spacing.xs,
                borderRadius: 0,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
                },
            })}
        >
            <Group noWrap={true}>
                <ThemeIcon color={color} size="lg">
                    {icon}
                </ThemeIcon>

                <Text size="md" className={styles.mainLinksText}>{label}</Text>
            </Group>
        </UnstyledButton>
    );
}

const data = [
    {icon: <MdHome size={22}/>, color: 'blue', label: 'Acasă', link: '/'},
    {icon: <MdFilePresent size={22}/>, color: 'teal', label: 'Excel', link: '/excel'},
    {icon: <MdMail size={22}/>, color: 'orange', label: 'Contact', link: '/contact'},
];

export default function MainLinks() {
    const links = data.map((link) => <MainLink {...link} key={link.label}/>);
    return <Group noWrap={true}>{links}</Group>;
}
