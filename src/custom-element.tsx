import { render } from 'preact'
import createCache from "@emotion/cache";
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const convertToCustomElement = (name: string, Component: any) => {
  if (customElements.get(name) !== undefined) {
    return;
  }

  class CustomElementWrapper extends HTMLElement {
    connectedCallback(): void {
      const container = this;
      const shadowContainer = container.attachShadow({ mode: 'open' });
      const emotionRoot = document.createElement('style');
      const shadowRootElement = document.createElement('div');
      shadowContainer.appendChild(emotionRoot);
      shadowContainer.appendChild(shadowRootElement);

      const cache = createCache({
        key: 'css',
        prepend: true,
        container: emotionRoot,
      });

      const shadowTheme = createTheme({
        components: {
          MuiPopover: {
            defaultProps: {
              container: shadowRootElement
            }
          },
          MuiPopper: {
            defaultProps: {
              container: shadowRootElement
            }
          },
          MuiModal: {
            defaultProps: {
              container: shadowRootElement
            }
          }
        },
      });


      render(
          (
              <CacheProvider value={cache}>
                {/* @ts-ignore */}
                <ThemeProvider theme={shadowTheme}>
                    {/* @ts-ignore */}
                    <Component />
                </ThemeProvider>
              </CacheProvider>
          ),
          shadowRootElement
      );
    }
  }

  customElements.define(name, CustomElementWrapper);
};


// render(<App />, document.getElementById('app') as HTMLElement)
