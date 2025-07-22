import { ReactElement, useState } from 'react';
import {
  Collapse,
  LinkTypeMap,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import IconifyIcon from 'components/base/IconifyIcon';
import { useLocation } from 'react-router-dom';
import { NavItem } from 'data/nav-items';

interface NavItemProps {
  navItem: NavItem;
  Link: OverridableComponent<LinkTypeMap>;
}

const NavButton = ({ navItem, Link }: NavItemProps): ReactElement => {
  const { pathname } = useLocation();
  const [checked, setChecked] = useState(false);

  // Check if any sublist path matches current path to highlight parent
  const isSublistActive = navItem.sublist
    ? navItem.sublist.some((sub) => pathname.startsWith(sub.path))
    : false;

  return (
    <ListItem
      sx={{
        my: 1.25,
        borderRadius: 2,
        backgroundColor:
          pathname === navItem.path || isSublistActive ? 'primary.main' : '',
        color: pathname === navItem.path || isSublistActive ? 'common.white' : 'text.secondary',
        '&:hover': {
          backgroundColor:
            pathname === navItem.path || isSublistActive ? 'primary.main' : 'action.focus',
          opacity: 1.5,
        },
      }}
    >
      {navItem.collapsible ? (
        <>
          <ListItemButton LinkComponent={Link} onClick={() => setChecked(!checked)}>
            <ListItemIcon>
              <IconifyIcon icon={navItem.icon as string} width={1} height={1} />
            </ListItemIcon>
            <ListItemText>{navItem.title}</ListItemText>
            <ListItemIcon>
              {checked ? (
                <IconifyIcon icon="mingcute:up-fill" width={1} height={1} />
              ) : (
                <IconifyIcon icon="mingcute:down-fill" width={1} height={1} />
              )}
            </ListItemIcon>
          </ListItemButton>

          <Collapse in={checked}>
            <List>
              {navItem.sublist?.map((subListItem: NavItem, idx: number) => (
                <ListItem
                  key={idx}
                  sx={{
                    backgroundColor: pathname.startsWith(subListItem.path)
                      ? 'primary.main'
                      : '',
                    color: pathname.startsWith(subListItem.path)
                      ? 'common.white'
                      : 'text.secondary',
                    '&:hover': {
                      backgroundColor: pathname.startsWith(subListItem.path)
                        ? 'primary.main'
                        : 'action.focus',
                      opacity: 1.5,
                    },
                  }}
                >
                  <ListItemButton
                    LinkComponent={Link}
                    href={
                      subListItem.path.startsWith('/')
                        ? subListItem.path
                        : `${navItem.path}/${subListItem.path}`
                    }
                  >
                    <ListItemText sx={{ ml: 3 }}>{subListItem.title}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </>
      ) : (
        <ListItemButton
          LinkComponent={Link}
          href={navItem.path}
          sx={{ opacity: navItem.active ? 1 : 0.6 }}
        >
          <ListItemIcon>
            <IconifyIcon icon={navItem.icon as string} width={1} height={1} />
          </ListItemIcon>
          <ListItemText>{navItem.title}</ListItemText>
        </ListItemButton>
      )}
    </ListItem>
  );
};

export default NavButton;
