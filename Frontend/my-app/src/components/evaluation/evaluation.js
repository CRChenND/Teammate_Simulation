import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Rating, Avatar, ButtonBase, Stack } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

function valuetext(value) {
  return `${value}`;
}

ChartJS.register(CategoryScale, LinearScale, BarElement);

const data = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: 'Idea Score',
      data: [2, 4, 3, 2, 1],
      backgroundColor: 'rgba(0, 181, 204, 1)',
    },
  ],
};

const options = {
  indexAxis: 'y', // 让条形图水平显示
  elements: {
    bar: {
      borderWidth: 0, // 不显示条形图的边框
      barThickness: 8, // 设置条的厚度
    },
  },
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false, // 隐藏X轴的网格线
      },
      ticks: {
        display: false, // 隐藏X轴的刻度
      }
    },
    y: {
      grid: {
        display: false, // 隐藏Y轴的网格线
      },
      ticks: {
        display: true, // 显示Y轴的刻度
        color: '#000', // Y轴刻度的颜色
        font: {
          size: 14, // 调整这个值以增大字体大小
        },
      }
    }
  },
  plugins: {
    legend: {
      display: false, // 隐藏图例
    }
  }
};

const Main = () => {
  return (
    <Grid container spacing={3} sx={{ p: 4 }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5">Task-Oriented Metrics</Typography>
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1">Number of ideas</Typography>
            <Typography variant="h4">9</Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1">Avg. GPT rated idea score</Typography>
            <Typography variant="h4">3.9</Typography>
            <Box sx={{ width: '75%', my: 2 }}>
              <Bar data={data} options={options} />
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5">Self-Rated Metrics</Typography>
          <Box
            sx={{
              p: 1,
              display: 'flex',
              alignItems: 'center',
              borderRadius: '16px',
              boxShadow: '模仿你的阴影样式', // 添加你的阴影样式
            }}
          >

            <Stack direction="row" spacing={1}>
              <ButtonBase
                sx={{ borderRadius: '20px', border: '2px solid gray' }}
              >
                <Typography variant="subtitle1" sx={{ px: 2 }} >Overall</Typography>
              </ButtonBase>
              <ButtonBase sx={{ borderRadius: '50%', border: '2px solid gray' }}>
                <Avatar alt="Person 1" src="/path-to-person1-image.jpg" />
              </ButtonBase>
              <ButtonBase sx={{ borderRadius: '50%', border: '2px solid gray' }}>
                <Avatar alt="Person 2" src="/path-to-person2-image.jpg" />
              </ButtonBase>
              <ButtonBase sx={{ borderRadius: '50%', border: '2px solid gray' }}>
                <Avatar alt="Person 3" src="/path-to-person3-image.jpg" />
              </ButtonBase>
            </Stack>
          </Box>
          <Box>
            <Typography variant="subtitle1">Overall</Typography>
            <Rating value={4.5} precision={0.1} size="large" readOnly />
            <Box sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Trust</Typography>
            <Rating value={4} precision={0.1} size="large" readOnly />
            <Box sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Cohesion</Typography>
            <Rating value={3.3} precision={0.1} size="large" readOnly />
            <Box sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Interaction quality</Typography>
            <Rating value={4.5} precision={0.1} size="large" readOnly />
            <Box sx={{ mb: 2 }} />
            <Typography variant="subtitle1">Satisfaction</Typography>
            <Rating value={4.0} precision={0.1} size="large" readOnly />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Main;
