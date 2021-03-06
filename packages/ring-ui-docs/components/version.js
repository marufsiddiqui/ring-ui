import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown';
import PopupMenu from '@jetbrains/ring-ui/components/popup-menu/popup-menu';

import branches from '../branches.json';

import {currentPath} from './utils';

const HOST = 'http://jetbrains.org/ring-ui';

const rgItemType = PopupMenu.ListProps.Type.LINK;

const branchesArr = Object.keys(branches).map(version => ({
  version,
  path: branches[version],
  // /^0\.1\.\d+$/
  versionRE: new RegExp(`^${version.replace(/\./g, '\\.').replace(/\*/g, '\\d+')}$`)
}));

const Version = ({version}) => (
  <Dropdown anchor={version}>
    <PopupMenu
      data={branchesArr.map(branch => {
        const active = branch.versionRE.test(version);
        return {
          rgItemType,
          active,
          href: `${HOST}${branch.path}${currentPath()}`,
          label: active ? version : branch.version
        };
      })}
      top={-16}
      left={-16}
    />
  </Dropdown>
);

Version.propTypes = {
  version: PropTypes.string
};

export default Version;
