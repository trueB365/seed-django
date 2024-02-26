'use client';
import { Input, Dropdown, Button, Space, MenuProps, message, Flex } from 'antd';
import { DownloadOutlined, GlobalOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';

const { Search } = Input;

interface MainMenuArgs {
  menuitems: {
    name: string;
    path: string;
    isActive?: boolean;
  }[];
  branding: {
    logo_url: string;
    website_title: string;
  },
  lang: MenuProps['items']
}

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};



const MainNavigation: React.FC<MainMenuArgs> = ({ menuitems, branding, lang }: MainMenuArgs) => {
  const langMenuProps = {
  items: lang,
  onClick: handleMenuClick,
};

  return (
    <>
      <header>
        <div className='container z-20 max-w-[1536px]'>
          <div className='branding justify-between align-items-center grid grid-cols-2 mx-auto w-full max-w-[1536px]'>
            <div className='branding-logo block py-2'>
              <img src={branding?.logo_url} alt='brand-logo' className='text-logo max-w-[350px] max-h-[65px]' />
            </div>
            <div className='branding-filters flex gap-1 items-center'>
              <Input placeholder='Search' suffix={<SearchOutlined />} size='middle' style={{ width: '520px'}}/>
              <Flex gap="small" wrap="wrap">
                <Button type="primary" icon={<DownloadOutlined />} size='small' />
                <Button type="primary" icon={<SettingOutlined />} size='small' />
                <Dropdown menu={langMenuProps}>
                <Button size='small'>
                  <Space>
                    <GlobalOutlined className='mr-1' />
                    Language
                  </Space>
                </Button>
              </Dropdown>
              </Flex>
            </div>
          </div>
        </div>
        <nav className='menu offcanvas-pb offcanvas-effect-1 text-md'>
          <div className='container mx-auto flex desktop:flex-row max-w-[1536px]'>
            {menuitems.map(({ name, path }, index) => (
              <a href={path} className='block px-4 py-2 capitalize' key={index}>{name}</a>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
};

export default MainNavigation;
