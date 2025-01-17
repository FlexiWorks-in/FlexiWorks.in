import { useState } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Button,
  Space,
  MenuProps,
  Menu,
  Image,
} from "antd";
import {
  CodeOutlined,
  RocketOutlined,
  BgColorsOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  SmileOutlined,
  PhoneOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import FlexiWorks from "./FlexiWorks.png";
import FlexiWorksCollapsed from "./FlexiWorksCollapsed.png";
import { color } from "../../global.color";
import DigitalCollaboration from "./DigitalCollaboration.png";

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <TeamOutlined />, label: "Services" },
  { key: "2", icon: <SmileOutlined />, label: "About" },
  { key: "3", icon: <PhoneOutlined />, label: "Contact" },
];

const LandingPage = () => {
  const services = [
    {
      title: "AI Solutions",
      icon: (
        <RocketOutlined
          style={{ fontSize: "50px", color: color.primaryGreen }}
        />
      ),
      description:
        "Harness the power of artificial intelligence to transform your business. Our cutting-edge AI solutions help automate processes, gain insights, and drive innovation.",
    },
    {
      title: "Web Apps",
      icon: (
        <CodeOutlined style={{ fontSize: "50px", color: color.primaryGreen }} />
      ),
      description:
        "Custom web applications built with modern technologies. From simple websites to complex enterprise solutions, we deliver scalable and responsive web experiences.",
    },
    {
      title: "Graphics Design",
      icon: (
        <BgColorsOutlined
          style={{ fontSize: "50px", color: color.primaryGreen }}
        />
      ),
      description:
        "Eye-catching designs that tell your story. Our designers create compelling visuals for brands, marketing materials, and digital platforms.",
    },
    {
      title: "Social Media Marketing",
      icon: (
        <ThunderboltOutlined
          style={{ fontSize: "50px", color: color.primaryGreen }}
        />
      ),
      description:
        "Strategic social media campaigns that connect with your audience. Build your brand presence and engage customers across all major platforms.",
    },
  ];

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: collapsed ? "80px" : "600px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: color.primaryDarkBlue,
        }}
      >
        <Image
          src={collapsed ? FlexiWorksCollapsed : FlexiWorks}
          alt="FlexiWorks Logo"
          style={{ margin: "16px auto", width: collapsed ? "40px" : "100px" }}
          preview={false}
        />
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          style={{ flex: 1 }}
        />
        {!collapsed && (
          <Button
            type="primary"
            style={{ margin: "16px" }}
            onClick={() => alert("Get Started clicked!")}
          >
            Get Started
          </Button>
        )}
        <Button
          type="text"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? (
            <RightOutlined color="white" style={{ color: "white" }} />
          ) : (
            <LeftOutlined color="white" style={{ color: "white" }} />
          )}
        </Button>
      </div>
      <div style={{ height: "100vh", overflow: "scroll" }}>
        <Layout>
          <Content style={{ paddingLeft: "20px" }}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div>
                <Row align="middle">
                  <Col xs={24} md={12}>
                    <Title className="mb-6">
                      Connect with Top Digital Talent
                    </Title>
                    <Paragraph className="text-lg mb-8">
                      FlexiWorks brings together clients and skilled
                      professionals in AI, web development, design, and digital
                      marketing. Transform your ideas into reality with our
                      expert network.
                    </Paragraph>
                    <Space>
                      <Button type="primary" size="large">
                        Find Talent
                      </Button>
                      <Button size="large">Learn More</Button>
                    </Space>
                  </Col>
                  <Col xs={24} md={12}>
                    <Image
                      src={DigitalCollaboration}
                      alt="FlexiWorks Logo"
                      style={{
                        margin: "16px auto",
                        width: "300px",
                      }}
                      preview={false}
                    />
                  </Col>
                </Row>
              </div>
            </div>

            {/* Services Section */}
            <div className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <Title level={2} className="text-center mb-16">
                  Our Services
                </Title>
                <Row gutter={[32, 32]}>
                  {services.map((service, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                      <Card
                        className="hover:shadow-lg transition-shadow duration-300"
                        bordered={false}
                        style={{ height: 250 }}
                      >
                        <div className="text-center mb-4">{service.icon}</div>
                        <Title level={4} className="text-center mb-4">
                          {service.title}
                        </Title>
                        <Paragraph className="text-center text-gray-600">
                          {service.description}
                        </Paragraph>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 py-16">
              <div
                className="max-w-7xl mx-auto px-4 text-center"
                style={{ marginBottom: "20px" }}
              >
                <Title className="text-white mb-8">
                  Ready to Start Your Next Project?
                </Title>
                <Button size="large" type="primary" ghost>
                  Contact Us Now
                </Button>
              </div>
            </div>
          </Content>

          <Footer
            className="bg-gray-800 text-white"
            style={{ backgroundColor: color.lightGray }}
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <Row gutter={[32, 32]}>
                <Col xs={24} sm={12} md={6}>
                  <Title level={4} className="text-white">
                    FlexiWorks
                  </Title>
                  <Paragraph className="text-gray-400">
                    Connecting talent with opportunity
                  </Paragraph>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Title level={4} className="text-white">
                    Services
                  </Title>
                  <ul className="list-none p-0">
                    <li className="text-gray-400 mb-2">AI Solutions</li>
                    <li className="text-gray-400 mb-2">Web Apps</li>
                    <li className="text-gray-400 mb-2">Graphics Design</li>
                    <li className="text-gray-400 mb-2">
                      Social Media Marketing
                    </li>
                  </ul>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Title level={4} className="text-white">
                    Company
                  </Title>
                  <ul className="list-none p-0">
                    <li className="text-gray-400 mb-2">About Us</li>
                    <li className="text-gray-400 mb-2">Careers</li>
                    <li className="text-gray-400 mb-2">Blog</li>
                    <li className="text-gray-400 mb-2">Contact</li>
                  </ul>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Title level={4} className="text-white">
                    Connect
                  </Title>
                  <ul className="list-none p-0">
                    <li className="text-gray-400 mb-2">Twitter</li>
                    <li className="text-gray-400 mb-2">LinkedIn</li>
                    <li className="text-gray-400 mb-2">Instagram</li>
                    <li className="text-gray-400 mb-2">Facebook</li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Footer>
        </Layout>
      </div>
    </div>
  );
};

export default LandingPage;
