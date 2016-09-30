import { createRenderer } from 'react-addons-test-utils';

export const shallow = elm => {
    let renderer = createRenderer();
    renderer.render(elm);
    return renderer.getRenderOutput();
};

