import React from 'react'
import background from '../../asset/about.svg'
const BodyAbout = () => {
  return (
    <>
      <div class="hero min-h-screen" style={{ backgroundImage: `url(${background})` }}>
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">Chúng tôi là ai?</h1>
            <p class="mb-5">MagicPost là công ty hoạt động trong lĩnh vực chuyển phát. Với nhiều điểm giao dịch trên toàn quốc, chỉ cần bạn yêu cầu, Magic Post luôn sẵn sàng phục vụ!</p>
            <a href='#body'>
              <button class="btn btn-primary">Tìm hiểu ngay</button>
            </a>
          </div>
        </div>
      </div>
      <div id='body' class="scroll-smooth lg:my-28 lg:mx-52 md:my-26 md:m-28 sm:my-26 sm:m-10 max-sm:my-26 max-sm:m-10">
        <article class="prose lg:prose-xl">
          <h1>Công ty chuyển phát Magic Post</h1>
          <h3>Giới thiệu</h3>
          <p>Magic Post là công ty hoạt động trong lĩnh vực chuyển phát.MagicPost là công ty hoạt động trong lĩnh vực chuyển phát. Công ty này có các điểm giao dịch phủ khắp cả nước. </p>
          <h3>Tầm nhìn</h3>
          <p>Với tầm nhìn dài hạn và quan điểm phát triển bền vững, Viettel Post luôn tập trung đầu tư công nghệ vào lĩnh vực chuyển phát. Ngoài ra, Viettel Post luôn tạo một môi trường làm việc chuyên nghiệp, hiện đại, phát huy tối đa quyền được làm việc, cống hiến, phát triển, tôn vinh của người lao động và sự kết hợp hài hoà giữa lợi ích của doanh nghiệp với lợi ích của cán bộ, nhân viên.</p>
          <h3>Sứ mệnh</h3>
          <p>Với mong muốn đem đến cho khách hàng sự yên tâm và những trải nghiệm tuyệt vời nhất khi sử dụng dịch vụ chuyển phát. Magic Post luôn không ngừng thay đổi để ngày càng đáp ứng sự mong đợi của Khách hàng.</p>
          <h3>Đội ngũ nhân viên</h3>
          <p>Đội ngũ nhân viên của Magic Post luôn nhiệt tình, thân thiện, sẵn sàng phục vụ khách hàng. Chúng tôi luôn cố gắng hết sức để mang đến cho khách hàng những trải nghiệm tốt nhất.</p>
        </article>
      </div>
    </>
  )
}

export default BodyAbout