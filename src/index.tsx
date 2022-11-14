import React from 'react';
import ReactDOM from 'react-dom/client';

import {Dropdown} from "./components";
import {Menu} from "./components";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Dropdown>
      {close => <Menu items={[
        { label: 'Item 1' },
        { label: 'Item 2' },
        { label: 'Item 3' }
      ]} onCommand={close} />}
    </Dropdown>
  </React.StrictMode>
);
