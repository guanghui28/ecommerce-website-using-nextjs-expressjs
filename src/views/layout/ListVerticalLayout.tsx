// ** Next
import { NextPage } from 'next'

// ** React
import React, { useEffect, useState } from 'react'

// ** MUI

import List from '@mui/material/List'
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

// ** Component
import IconifyIcon from 'src/components/Icon'

// ** Config
import { verticalItems } from 'src/configs/layout'

type TProps = {
  open: boolean
}

type TListItems = {
  level: number
  openItems: {
    [key: string]: boolean
  }
  items: any
  setOpenItems: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean
    }>
  >
  disabled: boolean
}

const RecursiveListItems: NextPage<TListItems> = ({
  items,
  level,
  disabled,
  setOpenItems,
  openItems
}) => {
  function handleClick(title: string) {
    if (!disabled) {
      setOpenItems(prev => ({ ...prev, [title]: !prev[title] }))
    }
  }
  return (
    <>
      {items.map((item: any) => (
        <React.Fragment key={item.title}>
          <ListItemButton
            sx={{
              padding: `8px 10px 8px ${level * (level === 1 ? 28 : 20)}px`
            }}
            onClick={() => {
              if (item.children) {
                handleClick(item.title)
              }
            }}
          >
            <ListItemIcon>
              <IconifyIcon icon={item.icon} />
            </ListItemIcon>
            {!disabled && <ListItemText primary={item.title} />}
            {item?.children && item.children.length > 0 && (
              <>
                {openItems[item.title] ? (
                  <IconifyIcon icon='mdi:expand-less' />
                ) : (
                  <IconifyIcon
                    icon='mdi:expand-less'
                    style={{ transform: 'rotate(180deg)' }}
                  />
                )}
              </>
            )}
          </ListItemButton>
          {item.children && item.children.length > 0 && (
            <>
              <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
                <RecursiveListItems
                  items={item.children}
                  level={level + 1}
                  disabled={disabled}
                  setOpenItems={setOpenItems}
                  openItems={openItems}
                />
              </Collapse>
            </>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (!open) {
      setOpenItems({})
    }
  }, [open])

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItems
        disabled={!open}
        openItems={openItems}
        setOpenItems={setOpenItems}
        items={verticalItems}
        level={1}
      />
    </List>
  )
}

export default ListVerticalLayout
