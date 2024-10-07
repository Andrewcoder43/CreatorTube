import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import YouTubeChannelList from "./components/YoutubeChannelList";
import RandomVideoGenerator from "./components/RandomVideoGenerator";
import './App.css';

const apiKey = "AIzaSyAiYrrgQImSbs7Bf7JmnhbULjAaoT1wYKE";
const channelIds = [
  "UCebC4x5l2-PQxg46Ucv9CsA",
  "UCSiDGb0MnHFGjs4E2WKvShw",
  "UCWEqIFOOjmL_olrETpSnGOQ",
  "UCj4KP216972cPp2w_BAHy8g",
  "UCi01FqOusRrzWwDQXWr2EsA",
  "UCk3JZr7eS3pg5AGEvBdEvFg",
  "UC1of9ELYwB623fWaAMRDVFA",
  "UCX4ppwcUldlxpuiRGoT1INQ",
  "UCbgYZnybgb6vPSBTxZUT2kA",
  "UCuSD-BXA1p8S3HfE8LsEkHA",
  "UCE8o2AWXA7SXZj7dcTQGZRA",
  "UCCEc63riIgeXAiy0RYDkHUQ",
  "UCyEd6QBSgat5kkC6svyjudA",
  "UCHKVXtT1YBCYUnnr4apqXfg",
  "UCF2qXppRwjoIUZNxIa9fdZA",
  "UCqiV_H8zqZEMdXZM63fz8TQ",
  "UCUYiOr24r02GuIFMEjYyuOw",
  "UCkkWiZ59-JghPsbwbIRVyRw",
  "UCPAk4rqVIwg1NCXh61VJxbg",
  "UCBlbxksRa-KRSEKLi6foxjQ",
  "UCHu2KNu6TtJ0p4hpSW7Yv7Q",
  "UCI4kahy_vOpM6yvykXCcpOA",
  "UCXZVpc1ngg72SMXzybqLT0A",
  "UCggHsHce2n3vvbJf_8YKrMA",
  "UClQubH2NeMmGLTLgNdLBwXg",
  "UC9EQKOkC3A8RtKBy282KK4w",
  "UCcDzewAE13qJXHbCmTPAT6A",
  "UC4vT4PeaB7v-kbpdY4aEBWg",
  "UCDsElQQt_gCZ9LgnW-7v-cQ",
  "UCGc8ZVCsrR3dAuhvUbkbToQ",
  "UC1OLx7nzJgIqwpDzFFrTuLA",
  "UCTeYrzSQ3YCp3RovGH4y8Ew",
  "UCX4ppwcUldlxpuiRGoT1INQ",
  "UCDDMpdWv1mGdx3ABJBgvidw",
  "UCs6GwefUl97r8a2DZrCQVmQ",
  "UCI9db2CtM5dMp1VHX_-QqUw",
  "UCoGlrIqQhFDhQJECHmK7YXg",
  "UCn25nZ12HEZq_w_m_1DmbbA",
  "UCO-fR0Fn04ByAiOxNYfi30A",
  "UCpuT8AlP9P9EgW_pZ0_xInQ",
  "UCWLu3q9FEmPPYKcUAxKZb2A",
  "UC0Wju2yvRlfwqraLlz5152Q",
  "UC5BJDVr4m9QEzQlvy_mKGsA",
  "UC2BoMmoR5HSmz5-oS8_1ENw",
  "UCkwZ4L2z5M_nLHoPtshyJbw",
  "UCSrnmu3W6YXWU_85DKT5arg",
  "UCgdx2sHMplnEYEGjVvdisrQ",
  "UCs418qlmDVmdo5guE7UUoDg",
  "UC24QmKMD73AwOYyCciq3pjA",
  "UC_hK9fOxyy_TM8FJGXIyG8Q",
  "UCauUrzZqKASUvkN5I2HQjMQ",
  "UCSGiYwWpkUUAgqfbFj9J46A",
  "UC4zS1wbO81p59CxKL7CQAcA",
  "UCCTM4f2c8fw389h7IPanjWA",
  "UCvD6IcobriqC89sVphFJV3w",
  "UC5wEWgN1dOUR6SLMOO-CuEg",
  "UCINb0wqPz-A0dV9nARjJlOQ",
  "UCZ-oMIRggrNuzsWLtNFXBXw",
  "UC0Xq3y4mpYYqbJlc_0Bj64Q",
  "UCwmZiChSryoWQCZMIQezgTg",
  "UC6E2mP01ZLH_kbAyeazCNdg",
  "UCPIvT-zcQl2H0vabdXJGcpg",
  "UCUw4K8hh4No3ks8wxfqj-uQ",
  "UC6zbH1Z4G32bBV9wyK6ikPA",
  "UCoFJTrXBGxaaL-fTGQdwB7Q",
  "UCU9FjEKGwl40uHfSgjgnYaQ",
  "UCiL9l2J57t5OG2aZ0huswZw",
  "UCxFQofXJq9WxWWqlsTiQ-Aw",
  "UCRpNVpZoW56rOsV-6wFK3lg",
  "UCEj4m5jks4UK9cTCbU6BtVw",
  "UCkQO3QsgTpNTsOw6ujimT5Q",
  "UCUaT_39o1x6qWjz7K2pWcgw",
  "UC7Q1WF_ncbiUjcn64imTB-g",
  "UCbAlVnKhbGLK78GsSemQXxw",
  "UCiILZEIfk6V0MVCFP5zDK5A",
  "UCs6ZQr6vTKU83dLhTABrN4g",
  "s_ineLBnNTGjrArNzjSLZg",
  "UCRbnz9KWgIc-x5k0xW6gZlg",
  "UCiVgalfKY22ubvswN9FyqAQ",
  "UCMKCW-9POlBeKF1GurkJPUQ",
  "UCBoXjMgqTNDcY395KJQkSRw",
  "UCSVhuD8mhAUrP7xpQmTrQkQ",
  "UCC-Zhd1UVyJUmjpaunmHvBQ",
  "UCzeB_0FNcPIyUSjL_TL5lEw",
  "UCyeVfsThIHM_mEZq7YXIQSQ",
  "UC_hSjGOO67A6gIDUcyuv_8A",
  "UCBsL0f1FZylqqhuKs5jhXCQ",
  "UCYZKDmmS5NNIaiD6hlNWh7Q",
  "UCIJ0lLcABPdYGp7pRMGccAQ",
  "UCzekWW1jawpjAA5M_K_9zxA",
  "UCH3aos_uf4pGHbkANSbceEg",
  "rrHPnOwcn4XlpFyiu1WJHQ",
  "UCeJQ-3Bs7AAN5m8HUbHG4-g",
  "_6ZjtcyARoL-zNgMT72gHg",
  "UCfcc8OORrouV1lO_qeIZVNQ",
  "UCuwJoiGWRxPYStBp0l0WuZw",
  "UCpB959t8iPrxQWj7G6n0ctQ",
  "UCL2hOcfXAxD44bGz0JIf-dA",
  "UC1wjrBtYqZtC3HeQydqZscA",
  "UCcM-EIxza5g1S0dpnoO_ePA",
  "UCOOoeFFt641fiLUghzE9CHg",
  "UCoOJhQHVjtRM1ObXX7xiXHA",
  "UCTdzndmRuTPbqaPUGaHzUmw",
  "UCCqQcLx_lIz70zeWzlB6fmQ",
  "UCrailkufB1aKrKc6l1osRgw",
  "UCdM-fLpO0Nv67NLDofSl9yA",
  "UCzl3Wh9yHUNhQDTLwzzn8uQ",
  "UCazay-C-shtEEUO78ObKGJg",
  "UC11-LdZRubZwoVid03rJv6A",
  "UCxEyrf1Ud59fvH9A5mNGwIg",
  "UCKx5lHJ6Fr5mbT4TYVLh6ng",
  "UCJIiJTuKHoZwWEsLsSa9VmQ",
  "UC0hpzdQ4JBfygpOl-5HVmSQ",
  "UCtinbF-Q-fVthA0qrFQTgXQ",
  "UCacUnnsPqzup0YE01CV3mwg",
  "UC0intLFzLaudFG-xAvUEO-A",
  "UCN__G2hSqRKuqedN3M0JCDg",
  "UCjWt5pZP6cghVCUR3yv1n7Q",
  "UCBa659QWEk1AI4Tg--mrJ2A",
  "UCKirXBZV7hE4Fws3VSdYkRQ",
  "UCXQbZmsuSr3ndvN8NGlo7oQ",
  "UCcOTVI8YJJud1A6aRYrV4sg",
  "UCjHU3-vf6O9uz39YzY9nQPw",
  "UCI4fHQkguBNW3SwTqmehzjw",
  "UCV-KFx9A6HD7gZ3FoMNzt7g",
  "UCca-PciLu55c5a1PqlffBqA",
  "UCkH8TpYdpCDJVZgCK2PVqYw",
  "UCjL8RB2T0AAidox0qkwjn4g",
  "UClqx4vYPFEKZD-i6VcL3qsw",
  "UCqfp_TZGkNakCWMNHPGxgng",
];



const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li>
              <Link to="/">CreatorTube</Link>
            </li>
            <li>
              <Link to="/random-video">Random Video Generator</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>CreatorTube</h1>
                <YouTubeChannelList apiKey={apiKey} channelIds={channelIds} />
              </>
            }
          />
          <Route
            path="/random-video"
            element={
              <RandomVideoGenerator apiKey={apiKey} channelIds={channelIds} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;