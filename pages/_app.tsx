import '../styles/globals.css'
import Head from 'next/head';
import MyAppShell from "../components/AppShell";
import React, {useState} from "react";
import {ColorScheme, ColorSchemeProvider, MantineProvider, Paper} from '@mantine/core';

function MyApp({Component, pageProps}) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    // @ts-ignore
    return (
        <>
            <Head>
                <title>A&A Consult</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>

            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>

                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        fontFamily: 'Open Sans',
                        colorScheme: colorScheme
                    }}
                >
                    <Paper>
                        <MyAppShell>
                            <Component {...pageProps} />
                        </MyAppShell>
                    </Paper>
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}

export default MyApp
