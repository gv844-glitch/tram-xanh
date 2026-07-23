import { Article, Category, GreenEvent } from '../types';
import { slugify } from '../utils/slug';

export const CATEGORIES: Category[] = [
  {
    id: 'tin-tuc',
    name: 'Tin tức',
    description: 'Cập nhật tin tức môi trường nóng hổi trong nước và quốc tế',
    icon: 'Newspaper',
    badgeCount: 10
  },
  {
    id: 'song-xanh',
    name: 'Sống xanh',
    description: 'Cẩm nang lối sống bền vững, giảm chất thải và tái chế',
    icon: 'Leaf',
    badgeCount: 10
  },
  {
    id: 'cong-nghe-xanh',
    name: 'Công nghệ xanh',
    description: 'Đột phá năng lượng tái tạo, đổi mới sáng tạo vì trái đất',
    icon: 'Cpu',
    badgeCount: 10
  },
  {
    id: 'cau-chuyen-xanh',
    name: 'Câu chuyện xanh',
    description: 'Những con người & dự án truyền cảm hứng bảo vệ thiên nhiên',
    icon: 'HeartHandshake',
    badgeCount: 10
  },
  {
    id: 'su-kien',
    name: 'Sự kiện',
    description: 'Các chiến dịch, hội thảo và ngày hội hành động vì môi trường',
    icon: 'Calendar',
    badgeCount: 10
  }
];

const AUTHORS = [
  {
    name: 'Nguyễn Minh Anh',
    role: 'Biên tập viên Môi trường',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Lê Hoàng Nam',
    role: 'Chuyên gia Sống bền vững',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Trần Đức Khoa',
    role: 'Kỹ sư GreenTech',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Phạm Thu Thảo',
    role: 'Phóng viên Sinh thái',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    name: 'Vũ Quốc Khánh',
    role: 'Điều phối viên Cộng đồng',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
];

const RAW_ARTICLES: Article[] = [
  // --- CHUYÊN MỤC 1: TIN TỨC (10 BÀI) ---
  {
    id: 'art-1',
    title: 'Hành trình phủ xanh các đô thị Việt Nam bằng cây bản địa thích ứng khí hậu',
    excerpt: 'Các chuyên gia lâm nghiệp vừa hoàn thành dự án thử nghiệm trồng 50.000 cây xanh bản địa tại các khu đô thị lớn, mở ra hướng đi bền vững cho kiến trúc cảnh quan.',
    content: [
      'Trong bối cảnh đô thị hóa nhanh chóng và hiện tượng đảo nhiệt đô thị gia tăng tại các thành phố lớn, việc lựa chọn chủng loại cây xanh phù hợp trở thành chìa khóa sinh tồn cho hạ tầng sinh thái thành phố.',
      'Dự án "Phủ xanh đô thị bằng cây bản địa" khởi xướng từ đầu năm 2025 đã mang lại những kết quả đáng kinh ngạc. Thay vì trồng các loài cây ngoại nhập dễ gãy đổ trong mùa mưa bão, các nhà nghiên cứu đã ưu tiên chọn lọc các giống cây bản địa như Lộc vừng, Dầu rái, Sao đen và Bằng lăng.',
      'Cây bản địa có hệ rễ cắm sâu, khả năng chịu hạn tốt và thu hút đa dạng sinh học địa phương như chim, bướm và côn trùng có lợi. Việc này giúp tiết kiệm 40% chi phí bảo dưỡng và tưới nước hàng năm.',
      'Chuyên gia Nguyễn Văn An từ Viện Sinh thái Đô thị chia sẻ: "Mỗi cây xanh bản địa được trồng xuống không chỉ là một cỗ máy lọc không khí tự nhiên, mà còn là chiếc neo giữ lại bản sắc thiên nhiên Việt Nam trong lòng phố thị."'
    ],
    category: 'tin-tuc',
    categoryName: 'Tin tức',
    author: AUTHORS[0],
    publishedAt: '22 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&fit=crop&q=80',
    featured: true,
    trending: true,
    tags: ['Đô thị xanh', 'Cây bản địa', 'Biến đổi khí hậu', 'Việt Nam']
  },
  {
    id: 'art-2',
    title: 'Việt Nam cam kết giảm 30% lượng phát thải khí Mê-tan vào năm 2030',
    excerpt: 'Bộ Tài nguyên và Môi trường vừa phê duyệt kế hoạch hành động quốc gia về kiểm soát phát thải khí nhà kính trong ngành nông nghiệp và quản lý rác thải.',
    content: [
      'Khí Mê-tan (CH4) là loại khí nhà kính có khả năng gây ra hiệu ứng nhà kính cao gấp 28 lần so với CO2 trong chu kỳ 100 năm. Do đó, kiểm soát phát thải Mê-tan được xem là giải pháp nhanh nhất để giảm tốc độ nóng lên toàn cầu.',
      'Kế hoạch của Việt Nam tập trung vào 3 lĩnh vực trọng điểm: chuyển đổi kỹ thuật canh tác lúa nước giảm phát thải, cải tiến quản lý phân bón chăn nuôi, và thu gom khí sinh học methane từ các bãi rác sinh hoạt.',
      'Các mô hình canh tác lúa "Nông - Lộ - Phơi" kết hợp kỹ thuật 1 phải 5 giảm tại Đồng bằng Sông Cửu Long đã chứng minh hiệu quả giảm 25% phát thải khí nhà kính mà vẫn giữ nguyên năng suất mùa vụ.'
    ],
    category: 'tin-tuc',
    categoryName: 'Tin tức',
    author: AUTHORS[3],
    publishedAt: '21 Tháng 7, 2026',
    readTime: '6 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
    featured: true,
    trending: false,
    tags: ['Giảm phát thải', 'Mê-tan', 'Nông nghiệp xanh', 'Chính sách']
  },
  {
    id: 'art-3',
    title: 'Nhiệt độ đại dương toàn cầu đạt mức kỷ lục mới trong mùa hè năm nay',
    excerpt: 'Dữ liệu từ Tổ chức Khí tượng Thế giới cảnh báo hiện tượng tẩy trắng rạn san hô đang diễn ra rộng khắp trên các vùng biển nhiệt đới.',
    content: [
      'Các phép đo vệ tinh mới nhất xác nhận nhiệt độ bề mặt nước biển trung bình toàn cầu đã duy trì ở mức cao chưa từng có trong 14 tháng liên tiếp.',
      'Sự tăng nhiệt này gây áp lực nghiêm trọng lên các hệ sinh thái rạn san hô – nơi cư trú của hơn 25% loài sinh vật biển. Hiện tượng tẩy trắng diện rộng đang đe dọa sinh kế của hàng triệu ngư dân coastal ven biển.',
      'Các nhà khoa học đang khẩn trương triển khai dự án bảo tồn nguồn gen san hô chịu nhiệt và xây dựng các khu bảo tồn biển nghiêm ngặt.'
    ],
    category: 'tin-tuc',
    categoryName: 'Tin tức',
    author: AUTHORS[0],
    publishedAt: '19 Tháng 7, 2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    tags: ['Đại dương', 'Biến đổi khí hậu', 'San hô', 'Toàn cầu']
  },
  {
    id: 'art-4',
    title: 'TP. Hồ Chí Minh nhân rộng mô hình tuyến hẻm xanh phân loại rác tại nguồn',
    excerpt: 'Hơn 500 tuyến hẻm tại các quận nội thành đã chính thức áp dụng phân loại rác thành 3 nhóm: hữu cơ, tái chế và rác còn lại.',
    content: [
      'Mô hình "Tuyến hẻm văn minh - Xanh - Sạch - Đẹp" không chỉ dừng lại ở việc dọn dẹp vệ sinh mà đã đi sâu vào quản lý rác thải bài bản.',
      'Từng hộ gia đình được trang bị 2 thùng rác riêng biệt kèm tài liệu hướng dẫn trực quan. Tổ dân phố tổ chức các buổi thu gom rác tái chế định kỳ đổi lấy quà tặng là chậu cây cảnh hoặc túi đi chợ bạt bền.',
      'Chỉ sau 3 tháng triển khai, lượng rác thải mang đi chôn lấp tại các quận thử nghiệm đã giảm đáng kể 20%.'
    ],
    category: 'tin-tuc',
    categoryName: 'Tin tức',
    author: AUTHORS[4],
    publishedAt: '18 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['TPHCM', 'Phân loại rác', 'Rác thải', 'Đô thị']
  },
  {
    id: 'art-5',
    title: 'Hơn 100 doanh nghiệp Việt nhận chứng nhận Carbon Neutral năm 2026',
    excerpt: 'Sự gia tăng mạnh mẽ các doanh nghiệp cam kết trung hòa carbon thể hiện bước chuyển mình tích cực trong tư duy kinh doanh bền vững.',
    content: [
      'Lễ trao chứng nhận Trung hòa Carbon (Carbon Neutral) vừa diễn ra tại Hà Nội tôn vinh các đơn vị đi đầu trong việc kiểm kê, giảm thiểu và bù đắp phát thải CO2.',
      'Các ngành hàng xuất khẩu như dệt may, da giày, chế biến gỗ và nông sản đang đối mặt với các tiêu chuẩn xanh nghiêm ngặt từ thị trường Châu Âu (CBAM). Việc chủ động xanh hóa quy trình sản xuất giúp doanh nghiệp Việt nâng cao năng lực cạnh tranh quốc tế.'
    ],
    category: 'tin-tuc',
    categoryName: 'Tin tức',
    author: AUTHORS[2],
    publishedAt: '17 Tháng 7, 2026',
    readTime: '7 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    tags: ['Doanh nghiệp xanh', 'Carbon Neutral', 'ESG', 'Kinh tế']
  },
  {
    id: 'art-6',
    title: 'Phát hiện loài động vật mới tại Vườn Quốc gia Phong Nha - Kẻ Bàng',
    excerpt: 'Các nhà sinh học quốc tế và Việt Nam vừa công bố phát hiện loài ếch cây mới có đặc tính sinh học độc đáo thích nghi với hang động vôi.',
    content: [
      'Loài ếch cây mới được đặt tên là Gracixalus phongnhaiensis nhằm ghi nhận sự phong phú sinh học của di sản thiên nhiên thế giới Phong Nha - Kẻ Bàng.',
      'Việc liên tục phát hiện các loài sinh vật mới khẳng định tầm quan trọng vô giá của công tác bảo tồn nghiêm ngặt các cánh rừng nguyên sinh tại miền Trung Việt Nam.'
    ],
    category: 'tin-tuc',
    categoryName: 'Tin tức',
    author: AUTHORS[3],
    publishedAt: '15 Tháng 7, 2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Đa dạng sinh học', 'Phong Nha', 'Bảo tồn', 'Khám phá']
  },
  {
    id: 'art-7',
    title: 'Liên minh Châu Âu chính thức cấm bán bao bì nhựa dùng 1 lần trong siêu thị',
    excerpt: 'Quy định mới bắt buộc các chuỗi bán lẻ chuyển sang bao bì phân hủy sinh học hoặc hệ thống đồ chứa sử dụng nhiều lần.',
    content: [
      'Chính sách bước ngoặt của EU nhằm loại bỏ hoàn toàn các loại khay nhựa, màng bọc nilon đơn dụng gói rau củ quả tươi.',
      'Các siêu thị sẽ cung cấp túi lưới vải tái sử dụng hoặc khay làm từ xơ dừa, bã mía. Động thái này dự kiến giảm hơn 4 triệu tấn rác nhựa mỗi năm.'
    ],
    category: 'tin-tuc',
    categoryName: 'Tin tức',
    author: AUTHORS[0],
    publishedAt: '14 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Châu Âu', 'Nhiệm vụ xanh', 'Cấm nhựa', 'Bao bì']
  },
  {
    id: 'art-8',
    title: 'Năng lượng tái tạo chiếm 55% tổng sản lượng điện toàn quốc trong Quý II',
    excerpt: 'Báo cáo từ Tập đoàn Điện lực ghi nhận đóng góp tích cực từ các trang trại điện gió ngoài khơi và hệ thống điện mặt trời mái nhà.',
    content: [
      'Sự kết hợp giữa thời tiết thuận lợi và việc đưa vào vận hành hệ thống lưu trữ năng lượng BESS công suất lớn đã giúp lưới điện quốc gia vận hành an toàn với tỷ trọng điện sạch kỷ lục.',
      'Đây là mốc đánh dấu quan trọng hướng tới cam kết Net Zero vào năm 2050 của Việt Nam.'
    ],
    category: 'tin-tuc',
    categoryName: 'Tin tức',
    author: AUTHORS[2],
    publishedAt: '12 Tháng 7, 2026',
    readTime: '6 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    tags: ['Điện gió', 'Năng lượng sạch', 'EVN', 'Net Zero']
  },
  {
    id: 'art-9',
    title: 'Đà Nẵng ra mắt xe buýt điện thông minh phục vụ khách du lịch',
    excerpt: 'Tuyến xe buýt không phát thải kết nối các điểm danh thắng chính của thành phố với công nghệ nhận diện và hệ thống tra cứu tự động.',
    content: [
      'Thành phố Đà Nẵng chính thức đưa 30 xe buýt điện chất lượng cao vào vận hành thử nghiệm. Xe được trang bị cổng sạc USB, Wi-Fi miễn phí và thiết bị thông minh kết nối với ứng dụng du lịch thành phố.',
      'Mỗi chuyến xe vận hành giúp giảm 85% khí CO2 so với xe buýt động cơ diesel truyền thống.'
    ],
    category: 'tin-tuc',
    categoryName: 'Tin tức',
    author: AUTHORS[4],
    publishedAt: '10 Tháng 7, 2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Đà Nẵng', 'Xe điện', 'Giao thông xanh', 'Du lịch']
  },
  {
    id: 'art-10',
    title: 'Khôi phục 100 ha diện tích rừng phòng hộ sông Hương sau mùa thiên tai',
    excerpt: 'Chương trình trồng cây phục hồi rừng đầu nguồn Thừa Thiên Huế nhận được sự chung tay của hàng ngàn tình nguyện viên.',
    content: [
      'Rừng phòng hộ đầu nguồn sông Hương có vai trò vô cùng quan trọng trong việc giữ đất, ngăn lũ quét và bảo vệ nguồn nước sinh hoạt cho thành phố Huế.',
      'Dự án ứng dụng công nghệ thả bóng hạt giống bằng flycam kết hợp trồng tay để tiếp cận các khu vực địa hình đồi núi dốc đứng khó đi lại.'
    ],
    category: 'tin-tuc',
    categoryName: 'Tin tức',
    author: AUTHORS[3],
    publishedAt: '08 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-8767614657f6?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Trồng rừng', 'Thừa Thiên Huế', 'Sông Hương', 'Thiên nhiên']
  },

  // --- CHUYÊN MỤC 2: SỐNG XANH (10 BÀI) ---
  {
    id: 'art-11',
    title: 'Zero-Waste Kitchen: 7 bước biến căn bếp gia đình thành không gian không rác thải',
    excerpt: 'Bắt đầu từ thói quen đi chợ không túi nilon đến cách phân loại rác hữu cơ làm phân bón compost ngay tại ban công căn hộ chung cư.',
    content: [
      'Căn bếp là nơi ấm cúng nhất trong nhà, nhưng cũng là nơi phát sinh nhiều rác thải sinh hoạt nhất. Việc thực hành lối sống Zero-Waste (không rác thải) không đòi hỏi sự hoàn hảo ngay từ ngày đầu, mà bắt đầu từ những thay đổi nhỏ mỗi ngày.',
      'Bước 1: Chuẩn bị túi vải tái sử dụng và hộp thủy tinh khi đi chợ hoặc siêu thị.',
      'Bước 2: Ưu tiên mua thực phẩm địa phương theo mùa để giảm dấu chân carbon vận chuyển.',
      'Bước 3: Tận dụng phần thừa thực phẩm như vỏ hoa quả làm dung dịch enzyme rửa bát hữu cơ.',
      'Bước 4: Sử dụng thùng ủ phân vi sinh (Bokashi) tại ban công để biến vỏ rau củ thành dinh dưỡng cho cây trồng.',
      'Lối sống xanh không phải là sự tước đoạt hay gò bó, mà là sự trở về với sự tối giản tinh tế và tràn đầy lòng biết ơn đối với tài nguyên thiên nhiên.'
    ],
    category: 'song-xanh',
    categoryName: 'Sống xanh',
    author: AUTHORS[1],
    publishedAt: '20 Tháng 7, 2026',
    readTime: '6 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&auto=format&fit=crop&q=80',
    featured: true,
    trending: true,
    tags: ['Zero Waste', 'Nông nghiệp đô thị', 'Ủ phân hữu cơ', 'Gia đình xanh']
  },
  {
    id: 'art-12',
    title: 'Giải pháp giảm vi nhựa trong thực phẩm hàng ngày cho gia đình Việt',
    excerpt: 'Tìm hiểu nguồn gốc vi nhựa xuất hiện trong chuỗi thức ăn và các biện pháp giảm thiểu phơi nhiễm vi nhựa hiệu quả tại nhà.',
    content: [
      'Nghiên cứu gần đây cho thấy vi nhựa đã xâm nhập sâu vào chuỗi cung ứng thực phẩm toàn cầu từ hải sản, muối ăn cho đến nước uống đóng chai.',
      'Bài viết tổng hợp lời khuyên từ các bác sĩ dinh dưỡng: Hạn chế dùng đồ nhựa quay vi sóng, ưu tiên dụng cụ thủy tinh, inox và lọc nước đúng tiêu chuẩn.',
      'Thay vì dùng màng bọc thực phẩm nilon, hãy thử chuyển sang màng bọc sáp ong (beeswax wrap) có thể rửa sạch và dùng lại hàng trăm lần.'
    ],
    category: 'song-xanh',
    categoryName: 'Sống xanh',
    author: AUTHORS[0],
    publishedAt: '18 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    tags: ['Sức khỏe', 'An toàn thực phẩm', 'Vi nhựa', 'Gia đình']
  },
  {
    id: 'art-13',
    title: 'Xây dựng vườn rau mini thẳng đứng tại ban công chung cư tốn ít chi phí',
    excerpt: 'Tự tay làm hệ thống trồng rau xanh từ chai nhựa tái chế và đất hữu cơ giúp gia đình luôn có rau sạch cho bữa ăn.',
    content: [
      'Bạn không cần một mảnh vườn rộng lớn mới có thể làm nông dân phố. Với các gờ ban công nhỏ hẹp từ 2-3m2, mô hình vườn treo thẳng đứng là giải pháp tối ưu không gian tuyệt vời.',
      'Lựa chọn các loại rau gia vị dễ sống như hành, húng quế, tía tơi, xà lách. Chúng cần ánh nắng trung bình 3-4 giờ/ngày và rất nhanh thu hoạch.',
      'Việc chăm sóc cây xanh mỗi buổi sáng còn giúp giảm bớt căng thẳng công việc sau những giờ làm việc máy tính mệt mỏi.'
    ],
    category: 'song-xanh',
    categoryName: 'Sống xanh',
    author: AUTHORS[1],
    publishedAt: '16 Tháng 7, 2026',
    readTime: '7 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Vườn ban công', 'Rau sạch', 'Trồng cây', 'Chung cư']
  },
  {
    id: 'art-14',
    title: 'Thời trang bền vững (Slow Fashion): Cách quản lý tủ đồ tối giản gọn gàng',
    excerpt: 'Học cách xây dựng tủ đồ Capsule Wardrobe giúp bạn mặc đẹp mỗi ngày mà không lãng phí tiền bạc và tài nguyên thiên nhiên.',
    content: [
      'Ngành công nghiệp thời trang nhanh (Fast Fashion) phát thải lượng carbon kỷ lục và xả hàng triệu tấn quần áo cũ ra bãi rác mỗi năm.',
      'Phương pháp Capsule Wardrobe khuyến khích bạn chỉ giữ khoảng 30-40 món đồ chất lượng cao, dễ phối kết hợp cùng nhau. Hãy ưu tiên các chất liệu tự nhiên như đũi, lụa, cotton hữu cơ và sợi đay.'
    ],
    category: 'song-xanh',
    categoryName: 'Sống xanh',
    author: AUTHORS[3],
    publishedAt: '15 Tháng 7, 2026',
    readTime: '6 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    tags: ['Thời trang xanh', 'Capsule Wardrobe', 'Tối giản', 'Sống chậm']
  },
  {
    id: 'art-15',
    title: 'Cách tẩy rửa nhà cửa an toàn từ chanh, dấm trắng và baking soda',
    excerpt: 'Loại bỏ hoàn toàn chất tẩy rửa hóa học độc hại trong gia đình bằng các công thức tự nhiên dễ làm, giá thành siêu rẻ.',
    content: [
      'Nhiều loại nước lau sàn và xịt kính hóa học chứa hương liệu nhân tạo có thể gây kích ứng hô hấp cho trẻ nhỏ và thú cưng.',
      'Sự kết hợp giữa Dấm trắng + Baking Soda + Vỏ chanh ngâm tạo ra chất tẩy rửa vạn năng, đánh bay vết bẩn cứng đầu trên bếp ga và bồn rửa mà vẫn thơm tho nhẹ nhàng.'
    ],
    category: 'song-xanh',
    categoryName: 'Sống xanh',
    author: AUTHORS[1],
    publishedAt: '13 Tháng 7, 2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Mẹo gia đình', 'Tẩy rửa tự nhiên', 'Sức khỏe', 'Organic']
  },
  {
    id: 'art-16',
    title: 'Thực đơn chay dinh dưỡng đủ chất cho người mới bắt đầu',
    excerpt: 'Khám phá bí quyết lên thực đơn chay cân bằng protein, sắt và vitamin B12 cho cả tuần tràn đầy năng lượng.',
    content: [
      'Ăn chay 1-2 ngày mỗi tuần (Meatless Monday) là hành động thiết thực giúp giảm đáng kể dấu chân carbon cá nhân.',
      'Bổ sung đa dạng các loại hạt, đậu nành, nấm, rau xanh đậm và ngũ cốc nguyên hạt để đảm bảo nguồn dinh dưỡng dồi dào cho cơ thể.'
    ],
    category: 'song-xanh',
    categoryName: 'Sống xanh',
    author: AUTHORS[0],
    publishedAt: '11 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Ăn chay', 'Dinh dưỡng', 'Sống khỏe', 'Giảm Carbon']
  },
  {
    id: 'art-17',
    title: 'Lựa chọn mỹ phẩm thuần chay (Vegan & Cruelty-Free) đúng chuẩn',
    excerpt: 'Nhận biết các nhãn chứng nhận uy tín trên bao bì mỹ phẩm để bảo vệ làn da và nói không với thử nghiệm trên động vật.',
    content: [
      'Mỹ phẩm thuần chay sử dụng các thành phần chiết xuất hoàn toàn từ thực vật, không chứa mỡ động vật hay mật ong, đồng thời không thử nghiệm trên động vật.',
      'Hãy tìm kiếm logo Thỏ Leaping Bunny hoặc PETA Vegan trên bao bì sản phẩm khi mua sắm.'
    ],
    category: 'song-xanh',
    categoryName: 'Sống xanh',
    author: AUTHORS[3],
    publishedAt: '09 Tháng 7, 2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Mỹ phẩm thuần chay', 'Làm đẹp xanh', 'Bảo vệ động vật']
  },
  {
    id: 'art-18',
    title: 'Sử dụng năng lượng tiết kiệm tại nhà: 10 mẹo giảm 30% tiền điện mùa hè',
    excerpt: 'Tối ưu hóa cách dùng điều hòa, tủ lạnh và các thiết bị điện tử giúp tiết kiệm chi phí sinh hoạt gia đình.',
    content: [
      'Cài đặt nhiệt độ điều hòa ở mức 26-28 độ C kết hợp quạt gió giúp tiết kiệm tới 15% điện năng tiêu thụ.',
      'Rút phích cắm các thiết bị điện tử khi không sử dụng để tránh dòng điện chờ (phantom load) tiêu tốn năng lượng âm thầm.'
    ],
    category: 'song-xanh',
    categoryName: 'Sống xanh',
    author: AUTHORS[1],
    publishedAt: '07 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Tiết kiệm điện', 'Mẹo gia đình', 'Năng lượng']
  },
  {
    id: 'art-19',
    title: 'Thói quen đi chợ bằng giỏ tre và túi lưới của thế hệ trẻ',
    excerpt: 'Trào lưu mang đồ đựng cá nhân khi đi mua sắm thực phẩm đang trở thành phong cách sống hiện đại của giới trẻ.',
    content: [
      'Không còn ngại ngùng, việc xách chiếc giỏ tre xinh xắn hay hộp inox đi mua đồ ăn sáng, trà sữa đang trở thành biểu tượng của sự tinh tế và có trách nhiệm với môi trường.'
    ],
    category: 'song-xanh',
    categoryName: 'Sống xanh',
    author: AUTHORS[4],
    publishedAt: '05 Tháng 7, 2026',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Giới trẻ', 'Phong cách sống', 'Túi vải']
  },
  {
    id: 'art-20',
    title: 'Sống tối giản Digital Minimalist: Giảm rác thải điện tử và nâng cao tập trung',
    excerpt: 'Cách dọn dẹp dung lượng đám mây, email rác và kéo dài tuổi thọ thiết bị công nghệ cá nhân.',
    content: [
      'Mỗi gigabyte dữ liệu lưu trữ đám mây cần điện năng duy trì máy chủ. Hãy dọn dẹp hòm thư điện tử và xóa bớt ảnh trùng lặp để nhẹ nhàng hơn.'
    ],
    category: 'song-xanh',
    categoryName: 'Sống xanh',
    author: AUTHORS[2],
    publishedAt: '03 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Digital Minimalist', 'Công nghệ', 'Tối giản']
  },

  // --- CHUYÊN MỤC 3: CÔNG NGHỆ XANH (10 BÀI) ---
  {
    id: 'art-21',
    title: 'Pin mặt trời thế hệ mới sản xuất từ nguyên liệu tự nhiên giá rẻ',
    excerpt: 'Nhóm nghiên cứu trẻ tại Việt Nam phát minh tấm quang năng tích hợp hợp chất thực vật giúp tăng hiệu suất hấp thụ ánh sáng lên 28%.',
    content: [
      'Một bước đột phá công nghệ năng lượng tái tạo vừa được ghi nhận tại Phòng thí nghiệm Năng lượng Sạch Việt Nam.',
      'Nhóm nghiên cứu đã ứng dụng công nghệ nhuộm nhạy màu sinh học chiết xuất từ sắc tố thực vật địa phương, giúp tấm pin mặt trời hấp thụ hiệu quả ngay cả trong điều kiện ánh sáng yếu hoặc nhiều mây.',
      'Công nghệ này hứa hẹn giảm giá thành sản xuất pin quang điện xuống 35%, tạo điều kiện cho các hộ gia đình vùng sâu vùng xa tiếp cận nguồn điện sạch ổn định.'
    ],
    category: 'cong-nghe-xanh',
    categoryName: 'Công nghệ xanh',
    author: AUTHORS[2],
    publishedAt: '19 Tháng 7, 2026',
    readTime: '6 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
    featured: true,
    trending: true,
    tags: ['Năng lượng mặt trời', 'GreenTech', 'Đổi mới sáng tạo', 'Điện sạch']
  },
  {
    id: 'art-22',
    title: 'Ứng dụng AI phân loại rác tự động chính xác 99% tại các nhà máy xử lý',
    excerpt: 'Robot phân loại thông minh tích hợp thị giác máy tính giúp tối ưu hóa chuỗi tái chế rác thải nhựa và kim loại.',
    content: [
      'Hệ thống robot tích hợp trí tuệ nhân tạo có khả năng phân biệt từng loại nhựa PET, HDPE, PP trong thời gian tính bằng miligiây.',
      'Nhờ đó, tỷ lệ rác thải được đưa vào tái chế tăng gấp 3 lần so với phương pháp phân loại thủ công, giảm thiểu rủi ro sức khỏe cho công nhân.'
    ],
    category: 'cong-nghe-xanh',
    categoryName: 'Công nghệ xanh',
    author: AUTHORS[2],
    publishedAt: '17 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    tags: ['Trí tuệ nhân tạo', 'Robot', 'Tái chế', 'Công nghệ']
  },
  {
    id: 'art-23',
    title: 'Vật liệu sinh học từ bã cà phê: Thay thế nhựa dẻo trong sản xuất gia dụng',
    excerpt: 'Startup Việt biến bã cà phê bỏ đi thành ly, thìa, bàn phím máy tính có khả năng phân hủy sinh học hoàn toàn sau 12 tháng.',
    content: [
      'Việt Nam là quốc gia xuất khẩu cà phê hàng đầu thế giới, xả ra hàng trăm nghìn tấn bã cà phê mỗi năm. Dự án tái chế bã cà phê đã chế tạo thành công hạt nhựa sinh học Bio-Composite.',
      'Sản phẩm từ bã cà phê có mùi thơm nhẹ dịu, chịu nhiệt tốt và không giải phóng độc tố khi đựng nước nóng.'
    ],
    category: 'cong-nghe-xanh',
    categoryName: 'Công nghệ xanh',
    author: AUTHORS[2],
    publishedAt: '15 Tháng 7, 2026',
    readTime: '6 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Vật liệu sinh học', 'Bã cà phê', 'Bioplastic', 'Kinh tế tuần hoàn']
  },
  {
    id: 'art-24',
    title: 'Hệ thống tuabin gió không cánh độc đáo hoạt động êm ái tại khu đô thị',
    excerpt: 'Công nghệ cộng hưởng dao động cho phép tạo ra điện năng từ gió mà không gây ra tiếng ồn hay nguy hiểm cho chim trời.',
    content: [
      'Tuabin gió Vortex không sử dụng cánh quạt quay truyền thống mà hoạt động dựa trên hiện tượng xoáy khí động học.',
      'Thiết kế dạng cột nhỏ gọn giúp sản phẩm dễ dàng lắp đặt trên mái nhà cao tầng hoặc công viên nội thành.'
    ],
    category: 'cong-nghe-xanh',
    categoryName: 'Công nghệ xanh',
    author: AUTHORS[2],
    publishedAt: '13 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Điện gió', 'Không cánh', 'Thiết kế xanh', 'Đổi mới']
  },
  {
    id: 'art-25',
    title: 'Công nghệ thu giữ Carbon trực tiếp từ không khí (DAC) cải tiến mới',
    excerpt: 'Giải pháp cỗ máy hút CO2 quy mô lớn giúp cô lập và lưu trữ carbon sâu dưới lòng đất an toàn.',
    content: [
      'Các nhà khoa học phát minh vật liệu lọc xốp thế hệ mới giúp giảm 50% năng lượng cần thiết để tách CO2 ra khỏi không khí.',
      'Lượng CO2 thu hồi có thể chuyển hóa thành khoáng chất đá vôi hoặc nguyên liệu sản xuất nhiên liệu tổng hợp.'
    ],
    category: 'cong-nghe-xanh',
    categoryName: 'Công nghệ xanh',
    author: AUTHORS[2],
    publishedAt: '11 Tháng 7, 2026',
    readTime: '7 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Thu giữ Carbon', 'Công nghệ', 'Khí hậu']
  },
  {
    id: 'art-26',
    title: 'Nông nghiệp chính xác nhờ cảm biến IoT và máy bay không người lái',
    excerpt: 'Nông dân miền Tây tối ưu lượng nước tưới và phân bón chính xác từng mét vuông ruộng nhờ dữ liệu thời gian thực.',
    content: [
      'Hệ thống cảm biến cắm dưới đất đo độ ẩm và độ mặn giúp tự động điều tiết van nước tưới. Flycam chụp ảnh hồng ngoại phát hiện sớm sâu bệnh.'
    ],
    category: 'cong-nghe-xanh',
    categoryName: 'Công nghệ xanh',
    author: AUTHORS[2],
    publishedAt: '09 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Nông nghiệp IoT', 'Flycam', 'Miền Tây', 'Công nghệ']
  },
  {
    id: 'art-27',
    title: 'Pin Natri-ion (Sodium-ion): Lựa chọn thay thế Pin Lithium thân thiện hơn',
    excerpt: 'Sử dụng nguyên liệu muối ăn dồi dào giúp sản xuất pin lưu trữ năng lượng giá rẻ và không gây tác hại khai thác khoáng sản.',
    content: [
      'Pin Natri-ion có tính an toàn cao, hoạt động tốt ở nhiệt độ lạnh và chi phí sản xuất thấp hơn 40% so với pin Lithium-ion.'
    ],
    category: 'cong-nghe-xanh',
    categoryName: 'Công nghệ xanh',
    author: AUTHORS[2],
    publishedAt: '07 Tháng 7, 2026',
    readTime: '6 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1558441719-677263a7f7d1?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Pin Natri', 'Lưu trữ năng lượng', 'GreenTech']
  },
  {
    id: 'art-28',
    title: 'Bê tông sinh học hấp thụ CO2 trong quá trình đóng đóng rắn',
    excerpt: 'Vật liệu xây dựng thế hệ mới ứng dụng vi khuẩn tảo biển giúp hàn gắn các vết nứt và lưu trữ khí nhà kính.',
    content: [
      'Loại bê tông đặc biệt này có khả năng tự chữa lành các nứt vỡ nhờ hoạt động của vi khuẩn, kéo dài tuổi thọ công trình lên hàng trăm năm.'
    ],
    category: 'cong-nghe-xanh',
    categoryName: 'Công nghệ xanh',
    author: AUTHORS[2],
    publishedAt: '05 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Xây dựng xanh', 'Bê tông', 'Vật liệu']
  },
  {
    id: 'art-29',
    title: 'Tàu chở hàng bằng năng lượng buồm gió hiện đại quay trở lại đại dương',
    excerpt: 'Thiết kế buồm khí động học bằng sợi carbon giúp các tàu container giảm 30% nhiên liệu hóa thạch.',
    content: [
      'Kết hợp công nghệ dự báo thời tiết bằng vệ tinh và hệ thống buồm tự động điều chỉnh hướng gió.'
    ],
    category: 'cong-nghe-xanh',
    categoryName: 'Công nghệ xanh',
    author: AUTHORS[2],
    publishedAt: '03 Tháng 7, 2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Vận tải biển', 'Năng lượng gió', 'Tàu biển']
  },
  {
    id: 'art-30',
    title: 'Hệ thống làm mát không dùng điện lấy cảm hứng từ tổ mối thiên nhiên',
    excerpt: 'Kiến trúc xanh ứng dụng thông gió tự nhiên giúp giảm 60% điện năng làm mát cho các tòa nhà văn phòng.',
    content: [
      'Bằng cách nghiên cứu cấu trúc lưu thông không khí tinh vi trong các tổ mối, các kiến trúc sư đã tạo ra các ống khói nhiệt tự nhiên.'
    ],
    category: 'cong-nghe-xanh',
    categoryName: 'Công nghệ xanh',
    author: AUTHORS[2],
    publishedAt: '01 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Kiến trúc xanh', 'Thông gió', 'Phát triển bền vững']
  },

  // --- CHUYÊN MỤC 4: CÂU CHUYỆN XANH (10 BÀI) ---
  {
    id: 'art-31',
    title: 'Lão nông dành 20 năm khôi phục cánh rừng mặn ven biển Nam Định',
    excerpt: 'Hơn 80 ha rừng ngập mặn được hồi sinh bằng tình yêu bám biển, trở thành bức tường xanh chắn sóng vững chắc cho ngôi làng mạc.',
    content: [
      'Nằm sát mép sóng biển bão bùng, ông Nguyễn Văn Hùng (68 tuổi) đã âm thầm gieo từng cây trang, cây đước từ những năm 2000.',
      'Ban đầu người dân cho rằng ông "gàn", nhưng sau hai thập kỷ, cánh rừng xanh thẫm nay là ngôi nhà của hàng nghìn loài chim nước và hải sản sinh sôi.',
      'Cánh rừng ngập mặn không chỉ bảo vệ đê biển khỏi sạt lở mà còn mang lại nguồn lợi thủy sản bền vững cho sinh kế của cả cộng đồng làng chài.'
    ],
    category: 'cau-chuyen-xanh',
    categoryName: 'Câu chuyện xanh',
    author: AUTHORS[3],
    publishedAt: '18 Tháng 7, 2026',
    readTime: '7 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
    featured: true,
    trending: false,
    tags: ['Rừng ngập mặn', 'Bảo vệ bờ biển', 'Nhân vật xanh', 'Cộng đồng']
  },
  {
    id: 'art-32',
    title: 'Cô gái trẻ bỏ phố về rừng khởi nghiệp với vườn dược liệu chuẩn Organic',
    excerpt: 'Hành trình phục hồi mảnh đất cằn cỗi ở Tây Nguyên thành trang trại sinh thái cung cấp trà thảo mộc tự nhiên.',
    content: [
      'Sau 5 năm làm việc tại văn phòng ở TP.HCM, Mai Phương quyết định trở về quê nhà Gia Lai. Chị ứng dụng phương pháp nông nghiệp thuận tự nhiên, không sử dụng thuốc trừ sâu hóa học.',
      'Hiện nay trang trại tạo việc làm ổn định cho 15 hộ đồng bào dân tộc thiểu số địa phương.'
    ],
    category: 'cau-chuyen-xanh',
    categoryName: 'Câu chuyện xanh',
    author: AUTHORS[3],
    publishedAt: '16 Tháng 7, 2026',
    readTime: '6 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    tags: ['Khởi nghiệp xanh', 'Tây Nguyên', 'Dược liệu', 'Organic']
  },
  {
    id: 'art-33',
    title: 'Biệt đội cứu hộ rùa biển âm thầm gác đêm tại đảo Côn Đảo',
    excerpt: 'Những kiểm lâm viên thức trọn đêm thu gom trứng rùa về hồ ấp an toàn, giúp tỷ lệ nở thành công đạt 85%.',
    content: [
      'Mỗi mùa rùa đẻ từ tháng 4 đến tháng 10, các anh phải di chuyển hàng chục km bờ biển trong đêm tối để bảo vệ trứng rùa khỏi thủy triều và động vật săn mồi.'
    ],
    category: 'cau-chuyen-xanh',
    categoryName: 'Câu chuyện xanh',
    author: AUTHORS[3],
    publishedAt: '14 Tháng 7, 2026',
    readTime: '8 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Rùa biển', 'Côn Đảo', 'Bảo tồn động vật', 'Kiểm lâm']
  },
  {
    id: 'art-34',
    title: 'Thầy giáo vùng cao biến rác nhựa thành đồ chơi và dụng cụ học tập cho học sinh',
    excerpt: 'Sáng kiến tái chế rác thải nhựa thành mô hình sinh động giúp lớp học miền núi luôn ngập tràn tiếng cười.',
    content: [
      'Thầy giáo Nguyễn Văn Minh tại Hà Giang đã phát động học sinh nhặt chai nhựa, nắp chai đổi lấy sách truyện và đồ dùng học tập.'
    ],
    category: 'cau-chuyen-xanh',
    categoryName: 'Câu chuyện xanh',
    author: AUTHORS[4],
    publishedAt: '12 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Giáo dục xanh', 'Hà Giang', 'Tái chế nhựa', 'Thầy giáo']
  },
  {
    id: 'art-35',
    title: 'Nhóm bạn trẻ nhặt rác gầm cầu Hà Nội: 3 năm biến điểm đen thành công viên nhỏ',
    excerpt: 'Nhóm "Hà Nội Xanh" đã dọn dẹp hàng trăm tấn rác thải tích tụ nhiều năm tại các bờ sông và gầm cầu.',
    content: [
      'Bắt đầu chỉ với 2 thành viên, nhóm hiện đã thu hút hơn 500 tình nguyện viên tham gia đều đặn vào mỗi cuối tuần.'
    ],
    category: 'cau-chuyen-xanh',
    categoryName: 'Câu chuyện xanh',
    author: AUTHORS[4],
    publishedAt: '10 Tháng 7, 2026',
    readTime: '6 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    tags: ['Hà Nội Xanh', 'Tình nguyện', 'Nhặt rác', 'Tuổi trẻ']
  },
  {
    id: 'art-36',
    title: 'Người lưu giữ giống lúa cổ truyền thích ứng hạn mặn ở miền Tây',
    excerpt: 'Lão nông gom góp bảo tồn 20 giống lúa mùa bản địa có khả năng chịu mặn tuyệt vời mà không cần phân bón hóa học.',
    content: [
      'Trong khi nhiều vùng chật vật vì biến đổi khí hậu, các giống lúa cổ truyền của ông vẫn xanh tốt bền bỉ.'
    ],
    category: 'cau-chuyen-xanh',
    categoryName: 'Câu chuyện xanh',
    author: AUTHORS[3],
    publishedAt: '08 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Lúa bản địa', 'Miền Tây', 'Hạn mặn', 'Nông nghiệp']
  },
  {
    id: 'art-37',
    title: 'Chuyến xe thư viện xanh lưu động mang tri thức môi trường đến trường làng',
    excerpt: 'Xe buýt chở hơn 3.000 đầu sách về thiên nhiên và dụng cụ kính hiển vi cho học sinh vùng xa trải nghiệm.',
    content: [
      'Trẻ em được tự tay soi quan sát tế bào lá cây, tìm hiểu về vòng đời của nước và xem phim hoạt hình bảo vệ động vật.'
    ],
    category: 'cau-chuyen-xanh',
    categoryName: 'Câu chuyện xanh',
    author: AUTHORS[4],
    publishedAt: '06 Tháng 7, 2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Thư viện xanh', 'Trẻ em', 'Tri thức', 'Sách']
  },
  {
    id: 'art-38',
    title: 'Hành trình vá rừng Sơn Trà của các chuyên gia bảo vệ Voọc chà vá chân nâu',
    excerpt: 'Kết nối các mảng rừng bị chia cắt giúp "nữ hoàng loài linh trưởng" di chuyển an toàn.',
    content: [
      'Xây dựng các cây cầu dây bắt qua đường cho voọc đi lại, giảm thiểu nguy cơ tai nạn giao thông.'
    ],
    category: 'cau-chuyen-xanh',
    categoryName: 'Câu chuyện xanh',
    author: AUTHORS[3],
    publishedAt: '04 Tháng 7, 2026',
    readTime: '7 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Sơn Trà', 'Voọc chà vá', 'Đà Nẵng', 'Động vật hoang dã']
  },
  {
    id: 'art-39',
    title: 'Người phụ nữ làm tranh từ rác lá cây khô xuất khẩu sang Châu Âu',
    excerpt: 'Tận dụng lá bàng, lá sen rụng biến thành các tác phẩm nghệ thuật thủ công tinh xảo độc đáo.',
    content: [
      'Mỗi bức tranh mang câu chuyện về vẻ đẹp thiên nhiên Việt Nam được bạn bè quốc tế vô cùng đón nhận.'
    ],
    category: 'cau-chuyen-xanh',
    categoryName: 'Câu chuyện xanh',
    author: AUTHORS[1],
    publishedAt: '02 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Tranh lá cây', 'Nghệ thuật xanh', 'Thủ công']
  },
  {
    id: 'art-40',
    title: 'Làng chài không rác nhựa đầu tiên tại đảo Lý Sơn',
    excerpt: 'Bà con ngư dân đồng lòng nói không với túi nilon, tự mang túi vải khi trao đổi hải sản.',
    content: [
      'Quyết tâm bảo vệ rạn san hô và môi trường du lịch biển đảo đã gắn kết cả cộng đồng đảo Lý Sơn.'
    ],
    category: 'cau-chuyen-xanh',
    categoryName: 'Câu chuyện xanh',
    author: AUTHORS[4],
    publishedAt: '30 Tháng 6, 2026',
    readTime: '6 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Lý Sơn', 'Làng chài', 'Không rác nhựa', 'Biển đảo']
  },

  // --- CHUYÊN MỤC 5: SỰ KIỆN (10 BÀI) ---
  {
    id: 'art-41',
    title: 'Ngày hội "Chủ Nhật Xanh 2026": Thu gom hơn 10 tấn rác thải nhựa tái chế',
    excerpt: 'Sự kiện thu hút hơn 3.000 học sinh, sinh viên và gia đình tham gia làm sạch cảnh quan bờ sông và phân loại rác đúng quy chuẩn.',
    content: [
      'Chương trình "Chủ Nhật Xanh" do liên minh Vì Môi Trường Việt Nam tổ chức tại 5 thành phố lớn đã gặt hái thành công ngoài mong đợi.',
      'Toàn bộ rác thải nhựa thu gom sẽ được các đơn vị tái chế phân loại, nấu hạt nhựa tái sinh để làm ghế công cộng và đồ dùng học tập tặng trẻ em vùng xa.',
      'Sự kiện cũng trao tặng 1.000 chậu cây xanh nhỏ cho các gia đình tham gia tích cực.'
    ],
    category: 'su-kien',
    categoryName: 'Sự kiện',
    author: AUTHORS[4],
    publishedAt: '16 Tháng 7, 2026',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: true,
    tags: ['Chủ Nhật Xanh', 'Tái chế nhựa', 'Thanh niên', 'Sự kiện cộng đồng']
  },
  {
    id: 'art-42',
    title: 'Phát động Giải thưởng "Sáng kiến Xanh Việt Nam 2026" tổng giá trị 1 tỷ đồng',
    excerpt: 'Cuộc thi tìm kiếm các giải pháp công nghệ, mô hình kinh doanh tuần hoàn và chiến dịch truyền thông cộng đồng xuất sắc.',
    content: [
      'Giải thưởng mở cổng nhận hồ sơ từ nay đến hết tháng 10/2026 cho tất cả các cá nhân, nhóm sinh viên và doanh nghiệp khởi nghiệp trên toàn quốc.',
      'Hội đồng giám khảo gồm các chuyên gia hàng đầu về biến đổi khí hậu và đại diện các quỹ đầu tư tác động xã hội.'
    ],
    category: 'su-kien',
    categoryName: 'Sự kiện',
    author: AUTHORS[0],
    publishedAt: '15 Tháng 7, 2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80',
    featured: true,
    trending: true,
    tags: ['Giải thưởng', 'Sáng kiến xanh', 'Cuộc thi', 'Startup']
  },
  {
    id: 'art-43',
    title: 'Hội thảo Quốc tế: Chuyển dịch Năng lượng Bền vững khu vực Đông Nam Á',
    excerpt: 'Quy tụ hơn 300 đại biểu từ các quốc gia ASEAN thảo luận về cơ chế tài chính xanh và hợp tác lưới điện thông minh.',
    content: [
      'Hội thảo tập trung trao đổi kinh nghiệm phát triển điện gió ngoài khơi, lộ trình giảm điện than và các mô hình hợp tác đa quốc gia.'
    ],
    category: 'su-kien',
    categoryName: 'Sự kiện',
    author: AUTHORS[2],
    publishedAt: '13 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Hội thảo', 'ASEAN', 'Năng lượng', 'Tài chính xanh']
  },
  {
    id: 'art-44',
    title: 'Lễ ra quân Chiến dịch "Bảo vệ Rạn san hô Việt Nam 2026"',
    excerpt: 'Hàng trăm thợ lặn tình nguyện hội tụ tại Nha Trang lặn dọn rác nhựa bám san hô và bắt sao biển gai hại rạn.',
    content: [
      'Chiến dịch kéo dài 1 tuần nhằm khôi phục và bảo vệ hệ sinh thái san hô quý giá tại vịnh Nha Trang.'
    ],
    category: 'su-kien',
    categoryName: 'Sự kiện',
    author: AUTHORS[3],
    publishedAt: '11 Tháng 7, 2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['San hô', 'Nha Trang', 'Lặn dọn rác', 'Biển']
  },
  {
    id: 'art-45',
    title: 'Ngày hội Đổi đồ cũ "Green Exchange": Tái sinh hàng ngàn món đồ cá nhân',
    excerpt: 'Sự kiện trao đổi sách, quần áo, cây xanh và đồ điện tử cũ thu hút đông đảo bạn trẻ tham gia.',
    content: [
      'Mô hình kinh tế tuần hoàn quy mô nhỏ giúp kéo dài vòng đời sản phẩm và giảm thiểu lãng phí sắm sửa đồ mới.'
    ],
    category: 'su-kien',
    categoryName: 'Sự kiện',
    author: AUTHORS[1],
    publishedAt: '09 Tháng 7, 2026',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Green Exchange', 'Đổi đồ cũ', 'Tái sử dụng', 'Bạn trẻ']
  },
  {
    id: 'art-46',
    title: 'Chiến dịch "Trồng 1 triệu cây xanh cho rừng phòng hộ Việt Nam"',
    excerpt: 'Hợp tác giữa Bộ TN&MT cùng các quỹ môi trường trao tặng cây giống cho nông dân miền núi.',
    content: [
      'Mỗi cây xanh trồng xuống được gắn mã QR theo dõi tọa độ định vị và quá trình tăng trưởng.'
    ],
    category: 'su-kien',
    categoryName: 'Sự kiện',
    author: AUTHORS[3],
    publishedAt: '07 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-8767614657f6?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Trồng 1 triệu cây', 'Rừng phòng hộ', 'Cộng đồng']
  },
  {
    id: 'art-47',
    title: 'Triển lãm Xe điện & Giao thông Xanh Việt Nam EV Show 2026',
    excerpt: 'Giới thiệu các dòng ô tô điện, xe máy điện và trạm sạc năng lượng mặt trời tân tiến.',
    content: [
      'Khách tham quan được chạy thử nghiệm các mẫu xe giao thông xanh mới nhất trên sa hình chuyên nghiệp.'
    ],
    category: 'su-kien',
    categoryName: 'Sự kiện',
    author: AUTHORS[2],
    publishedAt: '05 Tháng 7, 2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['EV Show', 'Xe điện', 'Triển lãm', 'Giao thông']
  },
  {
    id: 'art-48',
    title: 'Diễn đàn Giới trẻ vì Môi trường và Hành động Khí hậu (YEA 2026)',
    excerpt: 'Nơi hơn 200 đại diện thanh niên trình bày các dự án bảo vệ môi trường trước các cơ quan quản lý.',
    content: [
      'Tiếng nói thanh niên đóng vai trò quan trọng trong việc xây dựng các chính sách khí hậu tương lai.'
    ],
    category: 'su-kien',
    categoryName: 'Sự kiện',
    author: AUTHORS[4],
    publishedAt: '03 Tháng 7, 2026',
    readTime: '5 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Diễn đàn thanh niên', 'Thanh niên', 'Khí hậu']
  },
  {
    id: 'art-49',
    title: 'Ngày hội Trái Đất "Earth Day Run 2026" vì đại dương không rác thải',
    excerpt: 'Giải chạy việt dãn gây quỹ mua thiết bị lọc rác sông cho các vùng ven biển.',
    content: [
      'Mỗi km vận động viên hoàn thành tương ứng với 100g rác nhựa được dọn sạch khỏi môi trường.'
    ],
    category: 'su-kien',
    categoryName: 'Sự kiện',
    author: AUTHORS[4],
    publishedAt: '01 Tháng 7, 2026',
    readTime: '3 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Earth Day Run', 'Giải chạy', 'Gây quỹ', 'Biển xanh']
  },
  {
    id: 'art-50',
    title: 'Đêm nhạc "Giai Điệu Mẹ Thiên Nhiên" gây quỹ bảo tồn đa dạng sinh học',
    excerpt: 'Sự kiện hòa nhạc nghệ thuật tôn vinh vẻ đẹp của thiên nhiên và lời kêu gọi sống hòa hợp.',
    content: [
      'Toàn bộ doanh thu bán vé được chuyển vào Quỹ Bảo tồn Thiên nhiên Việt Nam.'
    ],
    category: 'su-kien',
    categoryName: 'Sự kiện',
    author: AUTHORS[0],
    publishedAt: '28 Tháng 6, 2026',
    readTime: '4 phút đọc',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    featured: false,
    trending: false,
    tags: ['Hòa nhạc', 'Âm nhạc xanh', 'Gây quỹ', 'Bảo tồn']
  }
];

export const ARTICLES: Article[] = RAW_ARTICLES.map((art) => ({
  ...art,
  slug: slugify(art.title),
}));

export const EVENTS: GreenEvent[] = [
  {
    id: 'ev-1',
    title: 'Hội thảo Quốc gia: Giải pháp Hạ tầng Xanh cho Đô thị Biển',
    date: '15 Tháng 8, 2026',
    location: 'Trung tâm Hội nghị Quốc tế, Hà Nội & Online',
    organizer: 'Bộ Tài nguyên & Môi trường kết hợp Trạm Xanh',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
    description: 'Quy tụ hơn 50 chuyên gia khí hậu bàn về quy hoạch đô thị ven biển chống chọi nước biển dâng.',
    participantsCount: 450
  },
  {
    id: 'ev-2',
    title: 'Chiến dịch Làm sạch bãi biển & Trồng rừng phi lao',
    date: '28 Tháng 8, 2026',
    location: 'Bãi biển Cửa Lò, Nghệ An',
    organizer: 'Câu lạc bộ Thanh niên Xanh Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80',
    description: 'Chiến dịch tình nguyện 2 ngày 1 đêm thu gom rác thải bãi biển và trồng 2.000 cây phi lao chắn gió.',
    participantsCount: 1200
  },
  {
    id: 'ev-3',
    title: 'Triển lãm Sáng kiến Sinh viên vì Hành tinh Xanh',
    date: '10 Tháng 9, 2026',
    location: 'Đại học Quốc gia TP. Hồ Chí Minh',
    organizer: 'Mạng lưới Câu lạc bộ Môi trường Sinh viên',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    description: 'Trưng bày 30 mô hình khởi nghiệp xanh và giải pháp công nghệ tuần hoàn do sinh viên phát triển.',
    participantsCount: 800
  }
];

export const AI_SAMPLE_QUESTIONS = [
  'Làm thế nào để bắt đầu lối sống giảm rác thải tại nhà?',
  'Phân loại rác hữu cơ và vô cơ đúng cách như thế nào?',
  'Những loài cây bản địa nào tốt cho việc lọc không khí đô thị?',
  'Nguyên lý hoạt động của pin năng lượng mặt trời là gì?',
  'Làm sao để giải thích cho trẻ em hiểu về biến đổi khí hậu?'
];
