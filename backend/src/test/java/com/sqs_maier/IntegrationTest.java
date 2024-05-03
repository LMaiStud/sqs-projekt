package com.sqs_maier;

import com.sqs_maier.service.DataService;
import com.sqs_maier.util.Autobahn;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;

import static org.hamcrest.Matchers.containsString;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = Replace.NONE)
@TestPropertySource(locations = "classpath:application.properties")

public class IntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DataService dataService;

    @Test
    public void testGetDataEndpointAndDatabase() throws Exception {
        Autobahn[] autobahns = Autobahn.values();
        autobahns = Arrays.stream(autobahns)
                .filter(autobahn -> !autobahn.equals(Autobahn.UNKNOWN))
                .toArray(Autobahn[]::new);

        for(int index = 0; index< autobahns.length; index++){
            mockMvc.perform(MockMvcRequestBuilders.get("/roadworks")
                            .param("roadId", autobahns[index].toString())
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.status().isOk());
            //.andExpect(MockMvcResultMatchers.content().string(containsString("{\"roadworks\":[{\"identifier\":\"2023-001346--vi-bs.2023-10-13_07-30-00-000.f.devi-zus.2023-02-06_06-00-00-000_001.f.de1\",\"icon\":\"123\",\"isBlocked\":\"false\",\"future\":false,\"extent\":\"48.1905753418505,11.704051497672065,48.152466537723164,11.752987603708348\",\"point\":\"48.1905753418505,11.704051497672065\",\"startLcPosition\":\"14\",\"impact\":{\"lower\":\"München-Ost\",\"upper\":\"Aschheim/Ismaning\",\"symbols\":[\"BREAKDOWN_LANE\",\"BORDER_LEFT\",\"CLOSED\",\"CLOSED\",\"CLOSED\",\"CLOSED\",\"SEPARATE\",\"ARROW_DOWN\",\"ARROW_DOWN\",\"ARROW_DOWN\",\"SEPARATE\",\"ARROW_UP\",\"ARROW_UP\",\"BORDER_RIGHT\",\"ARROW_UP\"]},\"display_type\":\"ROADWORKS\",\"subtitle\":\" München-Nord -> München-Süd\",\"title\":\"A99 | Aschheim/Ismaning - München-Ost\",\"startTimestamp\":\"2023-10-13T07:30:00+02:00\",\"coordinate\":{\"lat\":48.1905753418505,\"long\":11.704051497672065},\"description\":[\"Zeitraum dieser Bauphase:\",\"Beginn: 13.10.23 um 07:30 Uhr\",\"Ende: 09.06.24 um 07:30 Uhr\",\"(Ende der Gesamtmaßnahme: 27.09.24)\",\"\",\"A99: München-Nord -> München-Süd, zwischen 0.8 km hinter AS Aschheim/Ismaning und 1.1 km vor AK München-Ost\",\"\",\"Länge: 5.71 km | Maximale Durchfahrtbreite: 9 m\",\"\",\"A99 8-streifiger Ausbau\"],\"routeRecommendation\":[],\"footer\":[],\"lorryParkingFeatureIcons\":[],\"geometry\":{\"type\":\"LineString\",\"coordinates\":[[11.704051498,48.190575342],[11.704279,48.190515501],[11.7051327,48.190283201],[11.707671,48.189523001],[11.7089909,48.189091901],[11.7104399,48.188581101],[11.7122141,48.187921301],[11.7130473,48.187584301],[11.7142768,48.187072801],[11.7147084,48.186889701],[11.7154963,48.186549901],[11.7156031,48.186499801],[11.7166753,48.185997001],[11.7172425,48.185715701],[11.7182608,48.185224501],[11.7187627,48.184970101],[11.7194799,48.184575901],[11.7199382,48.184323901],[11.7205648,48.183977601],[11.7214005,48.183507001],[11.7221976,48.183029801],[11.7224125,48.182895801],[11.7235244,48.182201901],[11.7240454,48.181860501],[11.7254321,48.180921601],[11.7259487,48.180545901],[11.7266153,48.180066501],[11.7266238,48.180059901],[11.727894,48.179077801],[11.7286779,48.178457601],[11.7292142,48.178008501],[11.7296341,48.177655701],[11.7302991,48.177094201],[11.7311741,48.176337401],[11.731982,48.175600801],[11.7326902,48.174950401],[11.7333083,48.174383401],[11.7338322,48.173865501],[11.7348916,48.172864101],[11.7351027,48.172659101],[11.7361426,48.171649001],[11.7368073,48.170980101],[11.7382115,48.169574801],[11.7398291,48.167909501],[11.7400982,48.167632501],[11.7415664,48.166095001],[11.7422828,48.165327401],[11.7425345,48.165059801],[11.7439952,48.163448901],[11.7456475,48.161613201],[11.7457254,48.161524401],[11.7460232,48.161184901],[11.7463701,48.160785201],[11.747192,48.159819801],[11.7481644,48.158716201],[11.7488008,48.157923001],[11.7492228,48.157404801],[11.7494417,48.157141301],[11.7494585,48.157121001],[11.7495837,48.156969101],[11.7500269,48.156420301],[11.7504883,48.155839301],[11.751478,48.154557201],[11.7521018,48.153706701],[11.7521872,48.153592901],[11.7522467,48.153512101],[11.7525189,48.153142201],[11.752987604,48.152466538]]}},{\"identifier\":\"2023-001346--vi-bs.2023-10-13_07-30-00-000.f.devi-zus.2023-02-06_06-00-00-000_001.f.de3\",\"icon\":\"123\",\"isBlocked\":\"false\",\"future\":false,\"extent\":\"48.15256598622029,11.753307075367308,48.19079893430291,11.704179768414013\",\"point\":\"48.15256598622029,11.753307075367308\",\"startLcPosition\":\"17\",\"impact\":{\"lower\":\"Aschheim/Ismaning\",\"upper\":\"München-Ost\",\"symbols\":[\"ARROW_DOWN\",\"BORDER_LEFT\",\"ARROW_DOWN\",\"ARROW_DOWN\",\"SEPARATE\",\"ARROW_UP\",\"ARROW_UP\",\"ARROW_UP\",\"SEPARATE\",\"CLOSED\",\"CLOSED\",\"CLOSED\",\"CLOSED\",\"BORDER_RIGHT\",\"BREAKDOWN_LANE\"]},\"display_type\":\"ROADWORKS\",\"subtitle\":\" München-Süd -> München-Nord\",\"title\":\"A99 | München-Ost - Aschheim/Ismaning\",\"startTimestamp\":\"2023-10-13T07:30:00+02:00\",\"coordinate\":{\"lat\":48.15256598622029,\"long\":11.753307075367308},\"description\":[\"Zeitraum dieser Bauphase:\",\"Beginn: 13.10.23 um 07:30 Uhr\",\"Ende: 09.06.24 um 07:30 Uhr\",\"(Ende der Gesamtmaßnahme: 27.09.24)\",\"\",\"A99: München-Süd -> München-Nord, zwischen 1.2 km hinter AK München-Ost und 0.8 km vor AS Aschheim/Ismaning\",\"\",\"Länge: 5.71 km | Maximale Durchfahrtbreite: 9 m\",\"\",\"A99 8-streifiger Ausbau\"],\"routeRecommendation\":[],\"footer\":[],\"lorryParkingFeatureIcons\":[],\"geometry\":{\"type\":\"LineString\",\"coordinates\":[[11.753307075,48.152565986],[11.7528501,48.153221901],[11.7525698,48.153605601],[11.7518289,48.154619501],[11.7514614,48.155088401],[11.7508285,48.155916101],[11.7503624,48.156500401],[11.7500182,48.156929001],[11.7498908,48.157081801],[11.7495233,48.157532501],[11.74912,48.158024301],[11.748453,48.158818801],[11.7480015,48.159348901],[11.7466835,48.160896101],[11.7463397,48.161286501],[11.7459373,48.161743301],[11.7453857,48.162359601],[11.7437653,48.164170201],[11.7434811,48.164482101],[11.7431855,48.164807201],[11.7429358,48.165078201],[11.7413609,48.166758801],[11.7397949,48.168390901],[11.7385335,48.169678501],[11.7384746,48.169737301],[11.737117,48.171093901],[11.7360685,48.172126501],[11.7355967,48.172594401],[11.7354868,48.172707301],[11.7354219,48.172769401],[11.7341127,48.174085001],[11.7329933,48.175076501],[11.7325109,48.175513901],[11.7323523,48.175662301],[11.7317547,48.176196301],[11.7315562,48.176373601],[11.7309222,48.176940001],[11.7307474,48.177091401],[11.7302933,48.177484701],[11.7289542,48.178599301],[11.7284367,48.179014401],[11.7277059,48.179595901],[11.7268827,48.180213001],[11.7266459,48.180385001],[11.7260017,48.180865001],[11.7244779,48.181905701],[11.7241783,48.182094101],[11.7232675,48.182691501],[11.7226313,48.183081001],[11.7222172,48.183334501],[11.7214973,48.183763401],[11.7208593,48.184122901],[11.7193293,48.184949501],[11.7184818,48.185375401],[11.7177712,48.185730301],[11.7174408,48.185895401],[11.7164035,48.186392501],[11.7152782,48.186901401],[11.7139216,48.187502501],[11.7124433,48.188098201],[11.712354,48.188134201],[11.7103651,48.188887801],[11.7091273,48.189312501],[11.7078333,48.189732601],[11.7064941,48.190147001],[11.7062372,48.190222601],[11.7051418,48.190537601],[11.7047676,48.190641501],[11.7044935,48.190717601],[11.7042463,48.190782301],[11.704179768,48.190798934]]}},{\"identifier\":\"2024-020859--vi-bs.2024-05-06_00-00-00-000_018.f.de0\",\"icon\":\"warnkegel\",\"isBlocked\":\"false\",\"future\":true,\"extent\":\"48.07739579695785,11.73227229349569,48.03260707658428,11.669901227498023\",\"point\":\"48.07739579695785,11.73227229349569\",\"startLcPosition\":\"19\",\"impact\":{\"lower\":\"München-Süd\",\"upper\":\"Haar\",\"symbols\":[\"SEPARATE\",\"ARROW_UP\",\"CLOSED\",\"CLOSED\",\"BORDER_RIGHT\",\"CLOSED\"]},\"display_type\":\"SHORT_TERM_ROADWORKS\",\"subtitle\":\" München-Nord -> München-Süd\",\"title\":\"A99 | Haar - München-Süd\",\"coordinate\":{\"lat\":48.07739579695785,\"long\":11.73227229349569},\"description\":[\"Die Baustelle ist zu folgenden Zeiträumen gültig:\",\"Jeden Montag, Dienstag, Mittwoch und Donnerstag zwischen dem 06.05.24 und dem 09.05.24 von 00:00 bis 05:00 Uhr.\",\"Jeden Montag, Dienstag, Mittwoch und Donnerstag zwischen dem 06.05.24 und dem 10.05.24 von 20:00 bis 00:00 Uhr.\",\"\",\"A99: München-Nord -> München-Süd, zwischen 3.2 km hinter AS Haar und 1.1 km vor AK München-Süd\",\"\",\"Länge: 6.9 km | Maximale Durchfahrtbreite: 5.25 m\",\"\",\"A99 Fahrbahninstandsetzung  Batonplattensanierung\"],\"routeRecommendation\":[],\"footer\":[],\"lorryParkingFeatureIcons\":[],\"geometry\":{\"type\":\"LineString\",\"coordinates\":[[11.732272293,48.077395797],[11.7318041,48.077009701],[11.7310138,48.076365401],[11.7291367,48.074900401],[11.7280307,48.074040701],[11.7270969,48.073339201],[11.7255469,48.072254901],[11.7251334,48.071977201],[11.7240095,48.071216501],[11.7233334,48.070783901],[11.7223132,48.070129001],[11.720219,48.068849101],[11.7194947,48.068423001],[11.7191457,48.068221101],[11.7185785,48.067895101],[11.717155,48.067097901],[11.7159516,48.066437101],[11.7142234,48.065525301],[11.7129525,48.064880701],[11.7108094,48.063842601],[11.7084136,48.062695901],[11.7070601,48.062068901],[11.7057065,48.061439101],[11.704372,48.060806601],[11.7033203,48.060329901],[11.7017641,48.059584701],[11.7012473,48.059336601],[11.7001026,48.058761401],[11.6993224,48.058347601],[11.6985777,48.057946001],[11.6976528,48.057417001],[11.6968333,48.056931601],[11.6961783,48.056516601],[11.695323,48.055953401],[11.6945111,48.055364401],[11.6937026,48.054769701],[11.6925179,48.053829701],[11.6917892,48.053177601],[11.6909867,48.052460101],[11.6904858,48.051985301],[11.6900072,48.051497401],[11.6890591,48.050470901],[11.6886907,48.050040801],[11.6883495,48.049638001],[11.6880443,48.049280501],[11.6869867,48.047986401],[11.6860201,48.046727701],[11.6842634,48.044444301],[11.6835052,48.043507401],[11.683125,48.043065801],[11.6824258,48.042247601],[11.6818038,48.041562401],[11.6812664,48.040995401],[11.680591,48.040321201],[11.6802888,48.040026801],[11.6798121,48.039572701],[11.6795234,48.039311001],[11.6793892,48.039189401],[11.6789174,48.038792401],[11.6785494,48.038470801],[11.677835,48.037874201],[11.6772644,48.037412901],[11.6766831,48.036956201],[11.6756951,48.036230801],[11.6753409,48.035970701],[11.6744413,48.035342201],[11.6736158,48.034801401],[11.6727199,48.034229301],[11.671818,48.033684101],[11.6709634,48.033193201],[11.6701508,48.032742801],[11.669901227,48.032607077]]}},{\"identifier\":\"2024-019515--vi-bs.2024-05-13_00-00-00-000.f.devi-zus.2024-05-13_00-00-00-000.f.de8\",\"icon\":\"warnkegel\",\"isBlocked\":\"false\",\"future\":true,\"extent\":\"48.031404413516704,11.667949962393463,48.22256616069845,11.626268237034637\",\"point\":\"48.031404413516704,11.667949962393463\",\"startLcPosition\":\"23\",\"impact\":{\"lower\":\"München-Fröttmaning Nord\",\"upper\":\"München-Süd\",\"symbols\":[\"SEPARATE\",\"ARROW_UP\",\"ARROW_UP\",\"ARROW_UP\",\"BORDER_RIGHT\",\"BREAKDOWN_LANE\"]},\"display_type\":\"SHORT_TERM_ROADWORKS\",\"subtitle\":\" München-Süd -> München-Süd-West\",\"title\":\"A99 | München-Süd - München-Fröttmaning Nord\",\"coordinate\":{\"lat\":48.031404413516704,\"long\":11.667949962393463},\"description\":[\"Die Baustelle ist zu folgenden Zeiträumen gültig:\",\"Jeden Montag, Dienstag, Mittwoch, Donnerstag, Freitag und Samstag zwischen dem 13.05.24 und dem 31.10.24 von 00:00 bis 07:00 Uhr.\",\"Jeden Montag, Dienstag, Mittwoch, Donnerstag, Freitag und Samstag zwischen dem 13.05.24 und dem 01.11.24 von 18:00 bis 00:00 Uhr.\",\"\",\"A99: München-Süd -> München-Süd-West, zwischen 0.9 km hinter AK München-Süd und 0.7 km vor AS München-Fröttmaning Nord\",\"\",\"Länge: 28.61 km | Maximale Durchfahrtbreite: 5.25 m\",\"\",\"A94 Grünpflege\"],\"routeRecommendation\":[],\"footer\":[],\"lorryParkingFeatureIcons\":[],\"geometry\":{\"type\":\"LineString\",\"coordinates\":[[11.667949962,48.031404414],[11.668193,48.031527201],[11.6685818,48.031714101],[11.6688528,48.031852001],[11.6692582,48.032058301],[11.6695204,48.032191801],[11.6703087,48.032616901],[11.6711493,48.033082201],[11.6719506,48.033544401],[11.6728893,48.034112101],[11.6737835,48.034680801],[11.6746705,48.035273701],[11.6754489,48.035808501],[11.6758084,48.036073301],[11.6768341,48.036829001],[11.677413,48.037279701],[11.6779789,48.037732101],[11.6787614,48.038394001],[11.6792273,48.038794601],[11.6799578,48.039453401],[11.6804413,48.039910701],[11.6807837,48.040246001],[11.6810684,48.040528601],[11.6815424,48.041009501],[11.682001,48.041494901],[11.6826089,48.042164801],[11.6833414,48.043017001],[11.6840404,48.043855701],[11.6843768,48.044261701],[11.6862566,48.046686901],[11.6872093,48.047921101],[11.6882443,48.049199101],[11.6885466,48.049569601],[11.6892882,48.050422601],[11.6902052,48.051426401],[11.6906977,48.051931601],[11.6911901,48.052403601],[11.6918988,48.053063901],[11.6926852,48.053735601],[11.6938434,48.054661101],[11.6946733,48.055276601],[11.6954782,48.055848901],[11.6963051,48.056402601],[11.6969955,48.056831001],[11.6977889,48.057302901],[11.6986632,48.057798101],[11.6994321,48.058212201],[11.700241,48.058639701],[11.7013866,48.059218001],[11.7018609,48.059450801],[11.703371,48.060177401],[11.7045402,48.060725301],[11.7058662,48.061333301],[11.7069125,48.061814301],[11.7075853,48.062128901],[11.7093504,48.062954201],[11.7112201,48.063842701],[11.713086,48.064758101],[11.7143498,48.065397601],[11.7159519,48.066237901],[11.7173445,48.066998801],[11.718711,48.067771201],[11.7192082,48.068055701],[11.7195581,48.068255801],[11.7196327,48.068298501],[11.7199641,48.068497301],[11.7208148,48.069011601],[11.7222284,48.069875301],[11.7225396,48.070067201],[11.7227513,48.070192601],[11.7234612,48.070654701],[11.7241516,48.071105901],[11.7253047,48.071878801],[11.7257032,48.072152901],[11.7274874,48.073399701],[11.7280799,48.073824801],[11.7282294,48.073932001],[11.7293499,48.074769001],[11.7312554,48.076238601],[11.7320271,48.076877101],[11.7326294,48.077370901],[11.7328419,48.077545101],[11.7344033,48.078892601],[11.7349299,48.079360201],[11.7362008,48.080523701],[11.7365082,48.080821101],[11.7365345,48.080846501],[11.7366957,48.080993401],[11.7378028,48.082064901],[11.737889,48.082149801],[11.7382054,48.082461401],[11.7395386,48.083830101],[11.7406047,48.084963401],[11.7412566,48.085690301],[11.7414156,48.085873101],[11.7415876,48.086071001],[11.7420518,48.086617001],[11.7427741,48.087465601],[11.7436388,48.088520801],[11.7443724,48.089471001],[11.7444488,48.089570001],[11.7453651,48.090756901],[11.7459679,48.091570901],[11.746177,48.091856001],[11.7469231,48.092900001],[11.7472108,48.093318701],[11.7475141,48.093772301],[11.7480368,48.094564701],[11.7484061,48.095129301],[11.7492719,48.096521001],[11.7493259,48.096607901],[11.7500297,48.097777501],[11.7507304,48.099008701],[11.7513275,48.100095501],[11.7516221,48.100651701],[11.7522093,48.101719701],[11.7527261,48.102726201],[11.7529062,48.103090501],[11.7532735,48.103833501],[11.7538061,48.105042801],[11.7538868,48.105221501],[11.7541945,48.105948801],[11.7544093,48.106459601],[11.7547607,48.107318901],[11.7552499,48.108577501],[11.7553969,48.108946201],[11.7555243,48.109268301],[11.7555772,48.109418201],[11.7555996,48.109481801],[11.756097,48.110891901],[11.7568866,48.113419801],[11.7569386,48.113608501],[11.756957,48.113675401],[11.7573222,48.115001501],[11.7578282,48.117047501],[11.7578987,48.117375301],[11.7580778,48.118207701],[11.7581195,48.118405401],[11.7582064,48.118836901],[11.7583384,48.119514501],[11.7584078,48.119905901],[11.7585361,48.120609501],[11.7586498,48.121300101],[11.7587007,48.121673201],[11.7588325,48.122591701],[11.7588581,48.122781301],[11.7588805,48.122946501],[11.758893,48.123038801],[11.7589165,48.123212701],[11.7589895,48.123819101],[11.7591809,48.125834001],[11.7592627,48.127000101],[11.7592639,48.127020501],[11.7592775,48.127257401],[11.7592921,48.127544101],[11.7593196,48.128026101],[11.7593386,48.128565801],[11.7593531,48.129022301],[11.7593579,48.129443901],[11.7593735,48.130822701],[11.759366,48.131449401],[11.7593637,48.131642201],[11.759352,48.132609901],[11.7593098,48.133283701],[11.7592905,48.133591301],[11.7592812,48.133739801],[11.7592226,48.134753201],[11.7592135,48.134862401],[11.7591607,48.135551101],[11.7590984,48.136251401],[11.759077,48.136509301],[11.758973,48.137701501],[11.7589518,48.137871101],[11.7588803,48.138349101],[11.7587499,48.139271701],[11.7585897,48.140220601],[11.7584972,48.140678801],[11.7584521,48.140888601],[11.758309,48.141553301],[11.7580693,48.142485901],[11.7579462,48.142950101],[11.7576056,48.144067701],[11.7571347,48.145404601],[11.7565789,48.146752301],[11.7563505,48.147257601],[11.7562592,48.147455701],[11.7556644,48.148664101],[11.7553299,48.149283301],[11.7550925,48.149722701],[11.7546264,48.150512301],[11.7544958,48.150730801],[11.7541479,48.151283101],[11.7535477,48.152220601],[11.7528501,48.153221901],[11.7525698,48.153605601],[11.7518289,48.154619501],[11.7514614,48.155088401],[11.7508285,48.155916101],[11.7503624,48.156500401],[11.7500182,48.156929001],[11.7498908,48.157081801],[11.7495233,48.157532501],[11.74912,48.158024301],[11.748453,48.158818801],[11.7480015,48.159348901],[11.7466835,48.160896101],[11.7463397,48.161286501],[11.7459373,48.161743301],[11.7453857,48.162359601],[11.7437653,48.164170201],[11.7434811,48.164482101],[11.7431855,48.164807201],[11.7429358,48.165078201],[11.7413609,48.166758801],[11.7397949,48.168390901],[11.7385335,48.169678501],[11.7384746,48.169737301],[11.737117,48.171093901],[11.7360685,48.172126501],[11.7355967,48.172594401],[11.7354868,48.172707301],[11.7354219,48.172769401],[11.7341127,48.174085001],[11.7329933,48.175076501],[11.7325109,48.175513901],[11.7323523,48.175662301],[11.7317547,48.176196301],[11.7315562,48.176373601],[11.7309222,48.176940001],[11.7307474,48.177091401],[11.7302933,48.177484701],[11.7289542,48.178599301],[11.7284367,48.179014401],[11.7277059,48.179595901],[11.7268827,48.180213001],[11.7266459,48.180385001],[11.7260017,48.180865001],[11.7244779,48.181905701],[11.7241783,48.182094101],[11.7232675,48.182691501],[11.7226313,48.183081001],[11.7222172,48.183334501],[11.7214973,48.183763401],[11.7208593,48.184122901],[11.7193293,48.184949501],[11.7184818,48.185375401],[11.7177712,48.185730301],[11.7174408,48.185895401],[11.7164035,48.186392501],[11.7152782,48.186901401],[11.7139216,48.187502501],[11.7124433,48.188098201],[11.712354,48.188134201],[11.7103651,48.188887801],[11.7091273,48.189312501],[11.7078333,48.189732601],[11.7064941,48.190147001],[11.7062372,48.190222601],[11.7051418,48.190537601],[11.7047676,48.190641501],[11.7044935,48.190717601],[11.7042463,48.190782301],[11.7029411,48.191108601],[11.7006396,48.191674501],[11.6993697,48.191956601],[11.6959607,48.192662301],[11.6944394,48.192977201],[11.6933235,48.193196701],[11.6919828,48.193454701],[11.6910584,48.193645001],[11.689264,48.194014501],[11.6860227,48.194719701],[11.6835492,48.195295301],[11.6828544,48.195468401],[11.6805798,48.196055601],[11.6800886,48.196188901],[11.6783214,48.196668201],[11.6769813,48.197049801],[11.6757348,48.197409401],[11.6737101,48.198027801],[11.6732142,48.198187701],[11.6710588,48.198882601],[11.6683412,48.199815801],[11.6679566,48.199947901],[11.6675052,48.200114701],[11.667334,48.200178101],[11.6650714,48.201009601],[11.6641141,48.201387601],[11.6620532,48.202211201],[11.6619879,48.202237001],[11.6611294,48.202589101],[11.6609865,48.202650701],[11.6604415,48.202885801],[11.6598758,48.203124701],[11.6595733,48.203252401],[11.6585415,48.203715401],[11.6571804,48.204344001],[11.656766,48.204546001],[11.6558301,48.205002101],[11.6550467,48.205407701],[11.6540151,48.205944401],[11.6529424,48.206543401],[11.6515263,48.207373601],[11.6511305,48.207612101],[11.6510164,48.207680801],[11.6493095,48.208760701],[11.6475928,48.209894701],[11.6473475,48.210070601],[11.6470378,48.210286001],[11.645432,48.211388501],[11.6436858,48.212612101],[11.6430448,48.213062701],[11.6416514,48.214035301],[11.6414263,48.214192901],[11.6407787,48.214607301],[11.6395807,48.215405401],[11.6386346,48.216023901],[11.6375071,48.216710101],[11.6369585,48.217031201],[11.6368739,48.217080901],[11.6361405,48.217525101],[11.6355107,48.217902101],[11.6340369,48.218744501],[11.6330959,48.219265601],[11.6320503,48.219818601],[11.6316954,48.220012901],[11.6312488,48.220248701],[11.6306589,48.220546901],[11.6297107,48.221005101],[11.6289408,48.221373901],[11.6280675,48.221762201],[11.6271192,48.222196801],[11.6263575,48.222528501],[11.626268237,48.222566161]]}}]}")));

        }

    }
}
