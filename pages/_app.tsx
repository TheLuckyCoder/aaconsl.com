import '../styles/globals.css'
import Head from 'next/head';
import MyAppShell from "../components/AppShell";
import React from "react";
import {ColorScheme, ColorSchemeProvider, MantineProvider, Paper} from '@mantine/core';
import {useColorScheme, useLocalStorage} from "@mantine/hooks";

export default function MyApp({Component, pageProps}): JSX.Element {
    const [colorScheme, setLocalColorScheme] = useLocalStorage<ColorScheme>({
        key: 'color-scheme',
        defaultValue: useColorScheme(),
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) => {
        const newValue = value || (colorScheme === 'dark' ? 'light' : 'dark')
        setLocalColorScheme(newValue)
    }

    return (<>
        <Head>
            <title>A&A Consult</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            <meta name="description" content="Dacă ești interesat în fișiere Excel care îți automatizează munca, pentru tine sau compania ta, ai găsit locul potrivit!" />
        </Head>

        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    fontFamily: 'Open Sans, sans-serif',
                    colorScheme: colorScheme,
                    primaryColor: 'green'
                }}
            >
                <Paper>
                    <MyAppShell>
                        <Component {...pageProps} />
                    </MyAppShell>
                </Paper>
            </MantineProvider>
        </ColorSchemeProvider>
    </>);
}
