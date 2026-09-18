import { Box, Button, Typography, alpha } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface PostPaywallProps {
  /** 已登录但非付费会员 → 提示升级；未登录 → 提示登录 */
  compact?: boolean;
}

export function PostPaywall({ compact = false }: PostPaywallProps) {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const isVip = user?.role === 'vip' || user?.role === 'admin' || user?.role === 'super_admin';

  return (
    <Box
      sx={{
        position: 'relative',
        mt: -4,
        pt: compact ? 3 : 5,
        pb: compact ? 3 : 4,
        px: { xs: 2, sm: 3, md: 4 },
        borderRadius: 2,
        textAlign: 'center',
        bgcolor: (t) => alpha(t.palette.primary.main, t.palette.mode === 'light' ? 0.04 : 0.1),
        border: (t) => `1px dashed ${alpha(t.palette.primary.main, 0.35)}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Box sx={{ mb: 4, height: 24, mx: -4, mt: -4, background: (t) =>
        `linear-gradient(to bottom, ${alpha(t.palette.background.paper, 0)}, ${alpha(t.palette.background.paper, t.palette.mode === 'light' ? 1 : 0.9)})` }} />

      <LockOutlined sx={{ fontSize: 40, color: 'primary.main', mb: 1.5 }} />

      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
        以下内容仅对付费会员开放
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 460, mx: 'auto', lineHeight: 1.8 }}>
        {!isAuthenticated
          ? '本文为付费专栏内容。登录并开通会员后即可阅读全文。'
          : isVip
            ? '你已是会员，若仍看到此提示请刷新页面。'
            : '本文为付费专栏内容。开通会员后即可阅读全文，解锁全部付费文章。'}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
        {!isAuthenticated ? (
          <Button variant="contained" onClick={() => navigate('/admin/login')} sx={{ px: 3 }}>
            登录 / 注册
          </Button>
        ) : (
          <Button variant="contained" onClick={() => navigate('/profile')} sx={{ px: 3 }}>
            查看会员状态
          </Button>
        )}
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2.5 }}>
        如需开通会员，请联系站长
      </Typography>
    </Box>
  );
}
