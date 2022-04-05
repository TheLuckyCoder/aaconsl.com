import React from 'react';
import {AppShell, Group, Header, Title, Image, Footer} from '@mantine/core';
import LightAndDarkModeButton from "../LightAndDarkModeButton";
import MainLinks from "./_mainLinks";
import YoutubeButton from "./_youtubeButton";
import styles from './MyAppShell.module.css'

export default function MyAppShell({children}): JSX.Element {
    return (<AppShell
        // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
        navbarOffsetBreakpoint="sm"
        // fixed prop on AppShell will be automatically added to Header and Navbar
        fixed
        header={
            <Header height={70} p="md">
                {/* Handle other responsive styles with MediaQuery component or createStyles function */}
                <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <Group align={"center"}>
                        <Title order={4} className={styles.title}>A&A Consult</Title>

                        <div style={{marginRight: '1em'}}>
                            <Image
                                src="/aaconsl_x256.webp"
                                alt=""
                                width={36}
                                height={36}
                            />
                        </div>
                    </Group>

                    <div style={{marginLeft: '1em', marginRight: '2em'}}>
                        <MainLinks/>
                    </div>

                    <div style={{marginLeft: 'auto', marginRight: '0.5em'}}>
                        <Group>
                            <YoutubeButton/>
                            <LightAndDarkModeButton/>
                        </Group>
                    </div>
                </div>
            </Header>
        }
        footer={
            <footer className="footer">
                <a
                    href="http://theluckycoder.net"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Website realizat de&nbsp;<b>Filea Răzvan Gheorghe</b>. Copyright © 2022
                </a>
            </footer>
        }
    >
        {children}
    </AppShell>);
}
