import { NavLink, useLocation } from 'react-router-dom'
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
} from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import ReceiptIcon from '@mui/icons-material/Receipt'
import SettingsIcon from '@mui/icons-material/Settings'
import SmartToyIcon from '@mui/icons-material/SmartToy'

export default function StoreOwnerLayoutSidebar() {
    const location = useLocation()

    const menuItems = [
        { label: 'Dashboard', path: 'dashboard', icon: <DashboardIcon /> },
        { label: 'Sản phẩm', path: 'products', icon: <InventoryIcon /> },
        { label: 'Đơn hàng', path: 'orders', icon: <ReceiptIcon /> },
        { label: 'AI', path: 'ai', icon: <SmartToyIcon /> },
        { label: 'Cài đặt', path: 'setting', icon: <SettingsIcon /> },
    ]

    const isActive = (path) =>
        location.pathname.includes(`/store-owner/${path}`)

    return (
        <div className="h-full px-4 py-6">
            <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
                fontSize={20}
            >
                Store Owner
            </Typography>

            <Divider />

            <List>
                {menuItems.map((item) => {
                    const active = isActive(item.path)

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <ListItemButton
                                selected={active}
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,
                                    backgroundColor: active
                                        ? '#e3f2fd'
                                        : 'transparent',
                                    color: active ? '#1976d2' : '#333',
                                    '&:hover': {
                                        backgroundColor: '#e3f2fd',
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{ color: active ? '#1976d2' : '#888' }}
                                >
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: active ? '600' : '500',
                                    }}
                                />
                            </ListItemButton>
                        </NavLink>
                    )
                })}
            </List>
        </div>
    )
}