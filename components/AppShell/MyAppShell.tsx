import React from 'react';
import {AppShell, Container, Group, Header, Image} from '@mantine/core';
import LightAndDarkModeButton from "../LightAndDarkModeButton";
import MainLinks from "./_mainLinks";
import YoutubeButton from "./_youtubeButton";

export default function MyAppShell({children}): JSX.Element {
    return (<AppShell
        // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
        navbarOffsetBreakpoint="sm"
        // fixed
        header={
            <Header height={90} p="md" style={{backgroundColor: '#1d6f42'}}>
                {/* Handle other responsive styles with MediaQuery component or createStyles function */}
                <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <Group align={"center"}>

                        <div style={{marginRight: '1em'}}>
                            <Image
                                src="/aaconsl_x128.webp"
                                alt=""
                                width={42}
                                height={42}
                            />
                        </div>
                    </Group>

                    <Container fluid>
                        <MainLinks/>
                    </Container>

                    <div style={{marginRight: '0.5em'}}>
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
                <p>Website realizat de&nbsp;<b>Filea Răzvan Gheorghe</b>. Copyright © {new Date().getFullYear()}</p>
            </footer>
        }
    >
        {children}
    </AppShell>);
}
