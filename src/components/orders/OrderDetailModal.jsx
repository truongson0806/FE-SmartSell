import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  Card,
  Stack,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";

import {
  Close,
  Phone,
  Mail,
  LocationOn,
  Inventory2,
  CreditCard,
  CalendarMonth,
  StickyNote2,
  ShoppingBag,
  Paid,
} from "@mui/icons-material";

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  const formatMoney = (value) =>
    Number(value || 0).toLocaleString("vi-VN") + "đ";

  const getProduct = (item) => {
    if (typeof item.productId === "object" && item.productId !== null) {
      return item.productId;
    }

    return null;
  };

  const getProductImage = (product) => {
    if (!product) return "";

    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0]?.url || product.images[0];
    }

    return product.image || product.thumbnail || "";
  };

  const getAddress = () => {
    const address = order.address || {};
    const parts = [
      address.street,
      address.ward,
      address.district,
      address.city,
    ].filter(Boolean);

    return parts.length ? parts.join(", ") : "Chưa có địa chỉ";
  };

  const getStatusColor = () => {
    switch (order.statusBE) {
      case "PROCESSING":
        return { bg: "#dbeafe", color: "#1d4ed8", label: "Đã thanh toán" };
      case "SHIPPING":
        return { bg: "#ffedd5", color: "#c2410c", label: "Đang giao" };
      case "DELIVERED":
        return { bg: "#dcfce7", color: "#15803d", label: "Hoàn thành" };
      case "CANCELLED":
        return { bg: "#fee2e2", color: "#b91c1c", label: "Đã hủy" };
      default:
        return { bg: "#e2e8f0", color: "#475569", label: order.status };
    }
  };

  const status = getStatusColor();

  return (
    <Dialog
      open={Boolean(order)}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: "24px",
          overflow: "hidden",
          bgcolor: "#f8fafc",
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          position: "relative",
          px: 3,
          py: 2.5,
          color: "white",
          background:
            "linear-gradient(135deg, #020617 0%, #1e3a8a 45%, #2563eb 100%)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -70,
            top: -90,
            width: 190,
            height: 190,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.12)",
          }}
        />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Chip
              icon={<ShoppingBag sx={{ color: "white !important" }} />}
              label="Chi tiết đơn hàng"
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.16)",
                color: "white",
                fontWeight: 800,
                mb: 1.5,
              }}
            />

            <Typography fontSize={28} fontWeight={900} lineHeight={1}>
              #{order.id?.slice(-8)?.toUpperCase()}
            </Typography>

            <Typography mt={0.8} fontSize={12} sx={{ opacity: 0.75 }}>
              {order.id}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.12)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.22)" },
            }}
          >
            <Close />
          </IconButton>
        </Stack>

        <Grid container spacing={1.5} mt={2}>
          <Grid item xs={12} md={4}>
            <HeaderMetric
              label="Tổng thanh toán"
              value={formatMoney(order.total)}
              icon={<Paid fontSize="small" />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <HeaderMetric
              label="Trạng thái đơn"
              value={status.label}
              icon={<Inventory2 fontSize="small" />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <HeaderMetric
              label="Số sản phẩm"
              value={`${order.items?.length || 0} sản phẩm`}
              icon={<ShoppingBag fontSize="small" />}
            />
          </Grid>
        </Grid>
      </Box>

      {/* CONTENT */}
      <DialogContent sx={{ p: 0, bgcolor: "#f8fafc" }}>
        <Box sx={{ p: 3 }}>
          {/* SUMMARY */}
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} md={3}>
              <SummaryBox
                label="Tổng tiền"
                value={formatMoney(order.total)}
                color="#0f172a"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <SummaryBox
                label="Trạng thái đơn"
                value={status.label}
                color={status.color}
                bg={status.bg}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <SummaryBox
                label="Sản phẩm"
                value={`${order.items?.length || 0} sản phẩm`}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <SummaryBox label="Ngày đặt" value={order.date} />
            </Grid>
          </Grid>

          {/* CUSTOMER / PAYMENT / ADDRESS */}
          <Card
            sx={{
              mb: 3,
              borderRadius: "22px",
              p: 2.5,
              boxShadow: "0 12px 35px rgba(15,23,42,0.06)",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography fontSize={18} fontWeight={900} color="#0f172a">
              Thông tin đơn hàng
            </Typography>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} md={4}>
                <Info icon={<Mail />} label="Email khách hàng" value={order.customer} />
              </Grid>

              <Grid item xs={12} md={4}>
                <Info icon={<Phone />} label="Số điện thoại" value={order.phone} />
              </Grid>

              <Grid item xs={12} md={4}>
                <Info
                  icon={<CreditCard />}
                  label="Phương thức thanh toán"
                  value={order.paymentMethod}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Info
                  icon={<CreditCard />}
                  label="Trạng thái thanh toán"
                  value={order.paymentStatus}
                />
              </Grid>

              <Grid item xs={12} md={8}>
                <Info
                  icon={<LocationOn />}
                  label="Địa chỉ giao hàng"
                  value={getAddress()}
                />
              </Grid>
            </Grid>
          </Card>

          {/* PRODUCTS */}
          <Card
            sx={{
              borderRadius: "22px",
              p: 2.5,
              boxShadow: "0 12px 35px rgba(15,23,42,0.06)",
              border: "1px solid #e2e8f0",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Box>
                <Typography fontSize={18} fontWeight={900} color="#0f172a">
                  Sản phẩm trong đơn
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                  Danh sách sản phẩm khách đã đặt
                </Typography>
              </Box>

              <Chip
                label={`${order.items?.length || 0} items`}
                sx={{
                  bgcolor: "#eff6ff",
                  color: "#1d4ed8",
                  fontWeight: 800,
                }}
              />
            </Stack>

            <Stack spacing={1.5}>
              {order.items?.map((item, index) => {
                const product = getProduct(item);
                const image = getProductImage(product);

                return (
                  <Box
                    key={item._id || index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.8,
                      borderRadius: "18px",
                      border: "1px solid #e2e8f0",
                      bgcolor: "white",
                    }}
                  >
                    <Avatar
                      src={image}
                      variant="rounded"
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: "14px",
                        bgcolor: "#f1f5f9",
                      }}
                    >
                      <Inventory2 />
                    </Avatar>

                    <Box flex={1} minWidth={0}>
                      <Typography fontSize={15} fontWeight={900} noWrap>
                        {product?.name || item.sku || "Sản phẩm"}
                      </Typography>

                      <Stack direction="row" gap={1} flexWrap="wrap" mt={0.8}>
                        {product?.brand && <MiniChip label={product.brand} />}
                        {product?.productModel && (
                          <MiniChip label={product.productModel} />
                        )}
                        {item.sku && <MiniChip label={`SKU: ${item.sku}`} />}
                      </Stack>
                    </Box>

                    <Box textAlign="right" flexShrink={0}>
                      <Typography fontSize={15} fontWeight={900}>
                        {formatMoney(product?.price || item.price)}
                      </Typography>

                      <Typography fontSize={12} color="text.secondary">
                        Số lượng: {item.quantity}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Card>

          {order.note && (
            <Card
              sx={{
                mt: 3,
                borderRadius: "22px",
                p: 2.5,
                boxShadow: "none",
                bgcolor: "#fffbeb",
                border: "1px solid #fde68a",
              }}
            >
              <Typography fontSize={16} fontWeight={900} color="#92400e">
                Ghi chú
              </Typography>

              <Typography mt={1} fontSize={14} color="#92400e">
                {order.note}
              </Typography>
            </Card>
          )}
        </Box>
      </DialogContent>


      {/* FOOTER */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "flex-end",
          bgcolor: "white",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            px: 4,
            py: 1.1,
            borderRadius: "14px",
            bgcolor: "#0f172a",
            fontWeight: 900,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#1e293b",
              boxShadow: "none",
            },
          }}
        >
          Đóng
        </Button>
      </Box>
    </Dialog>
  );
}

function HeaderMetric({ label, value, icon }) {
  return (
    <Box
      sx={{
        p: 1.6,
        borderRadius: "16px",
        bgcolor: "rgba(255,255,255,0.13)",
        border: "1px solid rgba(255,255,255,0.18)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{ display: "flex", opacity: 0.85 }}>{icon}</Box>

        <Typography fontSize={11} sx={{ opacity: 0.75 }}>
          {label}
        </Typography>
      </Stack>

      <Typography mt={0.7} fontSize={16} fontWeight={900}>
        {value}
      </Typography>
    </Box>
  );
}

function SectionTitle({ icon, title, subtitle }) {
  return (
    <Stack direction="row" spacing={1.4} alignItems="center">
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "13px",
          bgcolor: "#eff6ff",
          color: "#2563eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography fontSize={16} fontWeight={900} color="#0f172a">
          {title}
        </Typography>

        {subtitle && (
          <Typography fontSize={12} color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

function Info({ icon, label, value }) {
  return (
    <Box
      sx={{
        mb: 1.2,
        p: 1.4,
        borderRadius: "14px",
        bgcolor: "#f8fafc",
        border: "1px solid #e2e8f0",
      }}
    >
      <Stack direction="row" spacing={1.3}>
        <Box sx={{ display: "flex", color: "#64748b", mt: 0.2 }}>{icon}</Box>

        <Box minWidth={0}>
          <Typography fontSize={11} fontWeight={900} color="#94a3b8">
            {label}
          </Typography>

          <Typography
            fontSize={13.5}
            fontWeight={800}
            color="#0f172a"
            sx={{ wordBreak: "break-word" }}
          >
            {value || "Chưa có"}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

function MiniChip({ label }) {
  return (
    <Chip
      size="small"
      label={label}
      sx={{
        height: 23,
        borderRadius: "999px",
        bgcolor: "white",
        border: "1px solid #e2e8f0",
        fontSize: 11,
        fontWeight: 700,
        color: "#475569",
      }}
    />
  );
}
function SummaryBox({ label, value, color = "#0f172a", bg = "white" }) {
  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        borderRadius: "18px",
        bgcolor: bg,
        border: "1px solid #e2e8f0",
      }}
    >
      <Typography fontSize={12} fontWeight={800} color="text.secondary">
        {label}
      </Typography>

      <Typography
        mt={0.8}
        fontSize={20}
        fontWeight={900}
        color={color}
        noWrap
      >
        {value || "Chưa có"}
      </Typography>
    </Box>
  );
}